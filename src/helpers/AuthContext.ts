import React from 'react';

export interface Context {
  signIn: (username:string, password: string)=> Promise<void>
  signUp: (username:string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = React.createContext<Context>({
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
});

export default AuthContext;
