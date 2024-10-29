import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserService } from '../services/UserService';

export const useLogin = () => {
  const { login: authLogin } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await UserService.login(credentials);

      authLogin(userData);

      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred'); 
      }
    }
  };

  return { login, isLoading, error };
};
