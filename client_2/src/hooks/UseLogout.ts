import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserService } from '../services/UserService';

export const useLogout = () => {
  const { logout: authLogout } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      UserService.logout();
      authLogout();
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

  return { logout, isLoading, error };
};
