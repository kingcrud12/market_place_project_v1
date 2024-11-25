import React, { useState ,useEffect, useRef } from "react";
import "./UserPopup.css";
import EyeIcon from '../../../assets_2/icons/Regular/Eye.svg';
import EyeOffIcon from '../../../assets_2/icons/Regular/PhoneCall.svg';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../secret';

interface UserPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserPopup: React.FC<UserPopupProps> = ({ isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  //Etat pour afficher ou masquer le mot de passe
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState (''); 
  const [error, setError] = useState ('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password}),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Connexion réussie !");
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(`Erreur : ${data.message}`);
        
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Something went wrong. Please try again later."); // Affiche un message générique
    }
  };

  // Fermer le popup si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="user-popup" ref={popupRef}>
        <form   onSubmit={handleSubmit} className="form-group">
      <span className= "user-title-popup">Sign in to your account</span>
      
       

      {/* Email Input */}
        <div className="user-input-popup">
          <span className= "label-email">Email Address</span>
          <input 
          id="email" 
          type="email" 
          placeholder="Email" 
          className='input-popup'
          value= {email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          />
        </div>
        
        {/* Password Input */}
        <div className="user-input-popup">
           <div className="user-password">
             <span className="label-password">Password</span>
             <span onClick={() => navigate('/forgotpassword')}  className="forget-password">Forget Password?</span>
           </div>
           <div className="password-container">
          <input 
            id="password"
            type={showPassword ?"text" : "password"}
            className='input-popup-password'
            placeholder='password'
            value= {password}
            onChange={(e) => setPassword(e.target.value)}
           />
          
          <img
              src={showPassword ? EyeOffIcon : EyeIcon}
              alt={showPassword ? "Hide password" : "Show password"}
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
            
          </div>
        </div>
         
         {/* Affichage de l'erreur */}
       {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          className="login-button">Login →</button>
      </form>
      <div className="create-account">
        <div className="text-divider">
        <span className="create-label">Don’t have an account</span>
        </div>
        <button onClick={() => navigate('/signup')} className="create-account-button">Create Account</button>
      </div>
    </div>
  );
};

export default UserPopup; 