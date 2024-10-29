import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserService } from '../services/UserService';
import { UtileService } from '../utils/UtileService';

export const useRegister = () => {
  const { login: authLogin } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const register = async (formData: { name: string; email: string; confirmEmail: string; password: string }) => {
    setIsLoading(true); 
    setError(null);

    try {
      await UserService.register(formData);

      const userData = await UserService.login({ email: formData.email, password: formData.password });
      
      authLogin(userData);  
      
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        UtileService.displayErrors(error.message);
        setError(error.message);
      } else {
        UtileService.displayErrors('An unknown error occurred');
        setError('An unknown error occurred');
      }
    }
  };

  return { register, isLoading, error };
};
