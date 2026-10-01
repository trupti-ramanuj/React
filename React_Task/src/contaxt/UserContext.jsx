
import { createContext, useCallback, useEffect, useMemo, useReducer} from "react";

import {
  create as createApi,
  deleteUser as deleteApi,
  getUsers,
  login as loginApi,
  update as updateApi,
} from "../api/api";

export const UserContext = createContext();

const initialState = {
  users: [],
  loading: false,
  error: "",
  token: localStorage.getItem("accessToken"),
  currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
  loginLoading: false,
  loginError: "",
  actionLoading: false,
  actionError: "",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      
    case "LOGOUT":
      return {
        ...initialState,
        token: null,
        currentUser: null,
      };

      
    case "LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        users: action.payload,
      };

    case "API_ERROR":
      return {
        ...state,
        loading: false,
        actionLoading: false,
        error: action.payload,
        actionError: action.payload,
      };

      
    case "ACTION_START":
      return {
        ...state,
        actionLoading: true,
        actionError: "",
      };

    case "ADD":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "UPDATE":
      return {
        ...state,
        users: state.users.map((val) =>
          val.id !== action.payload.id ? val : action.payload,
        ),
      };
    case "DELETE":
      return {
        ...state,
        users: state.users.filter((val) => val.id !== action.payload),
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

 const login = useCallback(async (username, password) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const data = await loginApi(username, password);

      if (!data?.accessToken) {
        throw new Error("Authentication token was not returned.");
      }

      localStorage.setItem("accessToken", data.accessToken);

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
          accessToken: data.accessToken,
        })
      );

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });

      return {   success: true };
    } catch (error) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: error.message || "Login failed.",
      });

      return {
        success: false,
        error: error.message || "Login failed.",
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");

    dispatch({
      type: "LOGOUT",
    });
  }, []);

  const loadUsers = useCallback(async () => {
    dispatch({
      type: "LOAD_USERS",
    });

    try {
      const data = await getUsers();

      dispatch({
        type: "LOAD_SUCCESS",
        payload: data.users || [],
      });

      return {
        success: true,
      };
    } catch (error) {
      if (
        error.message.includes("401") ||
        error.message.toLowerCase().includes("unauthorized")
      ) {
        logout();
      }

      dispatch({
        type: "API_ERROR",
        payload: error.message || "Failed to load users.",
      });

      return {
        success: false,
        error: error.message,
      };
    }
  }, [logout]);

  useEffect(() => {
    if (state.token && state.users.length === 0) {
      loadUsers();
    }
  }, [state.token, state.users.length, loadUsers]);

  const addUser = useCallback(async (user) => {
    dispatch({
      type: "ACTION_START",
    });

    try {
      const created = await createApi(user);

      dispatch({
        type: "ADD",
        payload: {
          ...user,
          ...created,
        },
      });

      return {
        success: true,
        data: created,
      };
    } catch (error) {
      dispatch({
        type: "API_ERROR",
        payload: error.message || "Failed to create user.",
      });

      return {
        success: false,
        error: error.message,
      };
    }
  }, []);


  const update = useCallback(async (id, user) => {
    dispatch({
      type: "ACTION_START",
    });

    try {
      const updated = await updateApi(id, user);

      dispatch({
        type: "UPDATE",
        payload: {
          ...user,
          ...updated,
          id,
        },
      });

      return {
        success: true,
        data: updated,
      };
    } catch (error) {
      dispatch({
        type: "API_ERROR",
        payload: error.message || "Failed to update user.",
      });

      return {
        success: false,
        error: error.message,
      };
    }
  }, []);

  
  const remove = useCallback(async (id) => {
    dispatch({
      type: "ACTION_START",
    });

    try {
      await deleteApi(id);

      dispatch({
        type: "DELETE",
        payload: id,
      });

      return {
        success: true,
      };
    } catch (error) {
      dispatch({
        type: "API_ERROR",
        payload: error.message || "Failed to delete user.",
      });

      return {
        success: false,
        error: error.message,
      };
    }
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      loadUsers,
      addUser,
      update,
      remove,
    }),
    [
      state,
      login,
      logout,
      loadUsers,
      addUser,
      update,
      remove,
    ]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}


