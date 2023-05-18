import { ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@auth-token';

let authToken: string | null = null;

function getAuthToken() {
  return authToken;
}

function setAuthToken(token: string | null) {
  authToken = token;
  if (token === null) {
    AsyncStorage.removeItem(STORAGE_KEY);
  } else {
    AsyncStorage.setItem(STORAGE_KEY, token);
  }
}

export function AuthProvider(props: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((token) => {
      authToken = token;
      setLoading(false);
    });
  }, []);
  if (isLoading) {
    return null;
  }
  return <>{props.children}</>;
}

export function useAuth() {
  return { getAuthToken, setAuthToken };
}
