import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const AuthContext = createContext(null);
  const [user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)
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
    const unsubscribe=onAuthStateChanged(auth,currentUser=>{
        if(currentUser){
            setUser(currentUser)

        }
        else{
            setUser(null)
        }
        setLoading(false)
    })
    return ()=>{
        return unsubscribe();
    }
  },[])
  

  const authData={registerUser,auth,loginUser,logoutUser,user,loading}
  return (
    <AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
