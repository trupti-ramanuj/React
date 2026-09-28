import { createContext,useReducer} from "react";

export const UserContext = createContext();

const initialState ={
    users: [],
    loading:false,
    error:null,
};

const userReducer = (state,action)=>{
    switch(action.type){
        case "LOADING_USER":
            return{
                ...state,
                loading:true,
                error:null,
            };
        case "SUCCESS":
            return{
                ...state,
                loading:false,
                users:action.payload,
            };
        case "ERROR":
            return{
                ...state,
                loading:false,
                error:action.payload,
            };
        case "ADD_USER":
            return{
                ...state,
                users:[...state.users,action.payload],

            };
        case "UPDATE_USER":
            return{
                ...state,
                users: state.users.map((val)=> val.id === action.payload.id ? action.payload : val),
            };
         case "DELETE_USER":
            return{
                ...state,
                users:state.users.filter((val)=> val.id !== action.payload),
            };
            default:
                return state;          
    }
};

export const UserProvider = ({children})=>{
    const [state, dispatch] = useReducer(userReducer,initialState);


    const login = async (user) => {
        try{
            const token = localStorage.getItem("token");
    
            const res = await fetch('https://dummyjson.com/auth/login',
                {
                    method : "POST",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`${token}`,
                    },
                    body:JSON.stringify(user),
                }
            );
            if(!res.ok){
                throw new Error('Failed to Login');
            }
    
             const newUser = await res.json();
    
                dispatch({
                    type:"LOGIN_USER",
                    payload:newUser,
                });
            }catch(error){
              dispatch({
                type:"ERROR",
                payload: error.message,
              });
            } 
        }

    const getUser = async () =>{
        dispatch({type: "LOADING_USER"});


        try{
            const token = localStorage.getItem("token");

            const res =await fetch('https://dummyjson.com/users',
                {
                headers:{
                    Authorization: `${token}`,
                },
            });
            if(!res.ok){
               throw new Error("Failed to load users");
            }

            const data = await res.json();

            dispatch({
                type:"SUCCESS",
                payload:data.users,
            });
        }catch(error){
          dispatch({
            type:"ERROR",
            payload: error.message,
            });
        }   
    };
    const add = async (user) => {
        try{
            const token = localStorage.getItem("token");
    
            const res = await fetch('https://dummyjson.com/users/add',
                {
                    method : "POST",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`${token}`,
                    },
                    body:JSON.stringify(user),
                }
            );
            if(!res.ok){
                throw new Error('Failed to add user');
            }
    
             const newUser = await res.json();
    
                dispatch({
                    type:"ADD_USER",
                    payload:newUser,
                });
            }catch(error){
              dispatch({
                type:"ERROR",
                payload: error.message,
              });
            } 
        }
    const update= async (id,user)=>{
        try{
            const token = localStorage.getItem("token");

            const res = await fetch(`https://dummyjson.com/users/${id}`,{
                method:"PUT",
                headers:{
                    'Content-Type':"application/json",
                    Authorization:`${token}`,
                },
                body:JSON.stringify(user),
            });
            if(!res.ok){
                throw new Error('Failed to update user');
            }
            const data = await res.json();
            dispatch({
                type:"UPDATE_USER",
                payload:data,
            })
        }catch(error){
          dispatch({
            type:"ERROR",
            payload: error.message,
          });
        }
    };
    const deleteUser = async(id)=>{
        try{
            const token = localStorage.getItem("token");

            const res = await fetch(`https://dummyjson.com/users/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization:`${token}`,
                },
            });
            if(!res.ok){
                throw new Error('Failed to delete user');
            }
            dispatch({
                type:"DELETE_USER",
                payload:id,
            });
        }catch(error){
            dispatch({
                type:'ERROR',
                payload: error.message,
            });
        }
    };

    return(
        <UserContext.Provider value={{...state, login, getUser, add,update,deleteUser}}>
            {children}
        </UserContext.Provider>
    )
}    