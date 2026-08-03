import React, { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supbase";


interface AuthContextInterface {
  user: User | null;
  loading: boolean;
}


const initialContextState: AuthContextInterface = {
  user: null,
  loading: true,
};


export const AuthContext = React.createContext<AuthContextInterface>(
  initialContextState
);


const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const getUser = async () => {

      const { data } = await supabase.auth.getUser();

      setUser(data.user);
      setLoading(false);

    };

    getUser();


    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );


    return () => {
      subscription.unsubscribe();
    };

  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContextProvider;