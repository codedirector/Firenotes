import React,{ Children, useContext, createContext, useEffect, useState } from 'react'
import { onAuthStateChanged,signOut } from 'firebase/auth';
import { auth } from '../src/firebase'; 
const AuthContext = createContext();

export const Authprovider=({children})=>{
  const [user,setuser]=useState(null);
  const [loading,setloading]=useState(true);
  
  useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setuser(currentUser);
    setloading(false);
  });
  return () => unsubscribe();
  },[])
  const logout = () => {
    signOut(auth)
      .then(() => {
        setuser(null); 
        // console.log("User logged out");
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  };
  return(<AuthContext.Provider value={{user,loading,logout}}>
  {!loading&&children}
    </AuthContext.Provider>)
}


export const useAuth = () => useContext(AuthContext);