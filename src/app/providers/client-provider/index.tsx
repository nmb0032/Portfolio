'use client';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const IsClient = createContext(false);

export const IsClientProvider = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return <IsClient.Provider value={isClient}>{children}</IsClient.Provider>;
};

export function useIsClient() {
  return useContext(IsClient);
}
