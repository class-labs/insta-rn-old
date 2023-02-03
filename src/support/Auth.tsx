import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

type Context = {
  getAuthToken: () => string | null;
  setAuthToken: (token: string | null) => void;
};

const AuthContext = createContext<Context | null>(null);

export function AuthProvider(props: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const authTokenRef = useRef(authToken);
  authTokenRef.current = authToken;
  const context = useMemo<Context>(
    () => ({
      getAuthToken: () => authTokenRef.current,
      setAuthToken: (token: string | null) => setAuthToken(token),
    }),
    [],
  );
  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be within AuthProvider');
  }
  return context;
}
