import { useContext } from 'react';
import { UserContext } from "../contaxt/UserContext";

const useUsers=()=>{
    return useContext(UserContext);
}
export default useUsers