import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
   const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")))

   const login =async (inputs) => {
    const res  =await axios.post("/auth/login",inputs)
    setCurrentUser(res.data)
   }

   const logout =async (inputs) => {
    await axios.post("/auth/logout")
    setCurrentUser(null)
   }

   useEffect(() => {
      localStorage.setItem("user",JSON.stringify(currentUser))
   },[currentUser])

   return <AuthContext.Provider value={{currentUser,login,logout}}>
     {children}
   </AuthContext.Provider>
}

