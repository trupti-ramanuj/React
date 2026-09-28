import { useContext } from "react";
import { UserContext } from "../contaxt/UserContext";

const useUsers = () => {
  const { users, loading, error, getUser, add, update } =
    useContext(UserContext);
  return { users, loading, error, getUser, add, update };
};
export default useUsers;
