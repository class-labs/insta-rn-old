import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@auth-token';

async function getSavedAuthToken() {
  return await AsyncStorage.getItem(STORAGE_KEY);
}

type Context = {
  getAuthToken: () => string | null;
  setAuthToken: (token: string | null) => void;
};

const AuthContext = createContext<Context | null>(null);

export function AuthProvider(props: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const authTokenRef = useRef(authToken);
  authTokenRef.current = authToken;
  const context = useMemo<Context>(
    () => ({
      getAuthToken: () => authTokenRef.current,
      setAuthToken: (token: string | null) => {
        setAuthToken(token);
        // Update the device storage
        if (token === null) {
          AsyncStorage.removeItem(STORAGE_KEY);
        } else {
          AsyncStorage.setItem(STORAGE_KEY, token);
        }
      },
    }),
    [],
  );

  // Load the previously saved auth token from device storage
  useEffect(() => {
    getSavedAuthToken().then((token) => {
      setAuthToken(token);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return null;
  }

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
