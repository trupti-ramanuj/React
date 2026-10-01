import { useContext } from "react";
import { UserContext } from "../contaxt/UserContext";
export function useUsers() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUsers must be used inside UserProvider"
    );
  }

  return context;
}