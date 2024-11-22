import React, { useState ,useEffect, useRef } from "react";
import "./UserPopup.css";
import EyeIcon from '../../../assets_2/icons/Regular/Eye.svg';
import EyeOffIcon from '../../../assets_2/icons/Regular/PhoneCall.svg';

interface UserPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserPopup: React.FC<UserPopupProps> = ({ isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  //Etat pour afficher ou masquer le mot de passe
  const [showPassword, setShowPassword] = useState(false);

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
        <form className="form-group">
      <span className= "user-title-popup">Sign in to your account</span>
      
      {/* Email Input */}
        <div className="user-input-popup">
          <span className= "label-email">Email Address</span>
          <input type="email"  className='input-popup' />
        </div>
        
        {/* Password Input */}
        <div className="user-input-popup">
           <div className="user-password">
             <span className="label-password">Password</span>
             <span  className="forget-password">Forget Password</span>
           </div>
           <div className="password-container">
          <input type={showPassword ?"text" : "password"} className='input-popup-password' />
          <img
              src={showPassword ? EyeOffIcon : EyeIcon}
              alt={showPassword ? "Hide password" : "Show password"}
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
            
          </div>
        </div>
        
        <button type="submit" className="login-button">Login →</button>
      </form>
      <div className="create-account">
        <div className="text-divider">
        <span className="create-label">Don’t have an account</span>
        </div>
        <button className="create-account-button">Create Account</button>
      </div>
    </div>
  );
};

export default UserPopup; 