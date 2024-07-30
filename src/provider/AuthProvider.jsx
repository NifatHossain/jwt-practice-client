import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  
  const [user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)
  const axiosPublic=useAxiosPublic();
  const registerUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const loginUser=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  const logoutUser=()=>{
    setLoading(true)
    return signOut(auth)
  }
  useEffect(()=>{
    const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
        if(currentUser){
            const userData= currentUser.email;
            setUser(currentUser)
            axiosPublic.post('/jwt',userData)
            .then(res=>{
                if(res.data.token){
                    localStorage.setItem('access-token',res.data.token)
                }
            })
        }
        else{
            setUser(null)
            localStorage.removeItem('access-token')
        }
        setLoading(false)
    })
    return ()=>{
        return unsubscribe()
    }
  },[axiosPublic])
  

  const authData={registerUser,auth,loginUser,logoutUser,user,loading}
  return (
    <AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
