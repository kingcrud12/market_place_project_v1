import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import './ResetNewPassword.css';
import Navigation from './../components/Homepage/Navigation';
import BreadCrumb from './../components/Others/BreadCrumb';
import Footer from './../components/Homepage/Footer';
import EyeIcon from '../../assets_2/icons/Regular/Eye.svg';
import EyeOffIcon from '../../assets_2/icons/Regular/PhoneCall.svg';
import { API_URL } from '../../secret';

const Forgotpassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);  
  const navigate = useNavigate(); // Initialisation du hook useNavigate
  const [password, setPassword] = useState ('');
  const [confirmPassword, setconfirmPassword] = useState ('');
  const [error, setError] = useState ('');
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword }),
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
    }
  };
  

  return (
    <div className="signin">
      <Navigation />
      <BreadCrumb />
      <form onSubmit={handleSubmit} className="body-signin">
        <div className="form-group-signin-forget">
          {/* Header */}
          <div className="head-signin-forget">
            {/* Onglet Sign In */}
            
              <span className="tab-label-forget">Reset Password</span>
              <span className="tab-second-label">
              Duis sagittis molestie tellus, at eleifend sapien pellque quis. Fusce lorem nunc, fringilla sit amet nunc.
              </span>
         
         </div>

         
          
            {/* Password Input */}
            <div className="user-input-popup-signup">
              <div className="user-password-signup">
                <label htmlFor="password" className="label-password-signup">Password</label>
              </div>
              <div className="password-container-signup">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input-popup-password-signup"
                  placeholder="8+ characters"
                  value= {password}
                  onChange={(e) => setPassword(e.target.value)}
                  required  
                />
                <img
                  src={showPassword ? EyeOffIcon : EyeIcon}
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  className="password-toggle-icon-signup"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            {/* confirm Password Input */}
            <div className="user-input-popup-signup">
              <div className="user-password-signup">
                <label htmlFor="password" className="label-password-signup">Confirm Password</label>
              </div>
              <div className="password-container-signup">
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  className="input-popup-password-signup"
                  placeholder="confirm your password"
                  value= {confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  required  
                />
                <img
                  src={showPassword ? EyeOffIcon : EyeIcon}
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  className="password-toggle-icon-signup"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            
            

             {/* Affichage de l'erreur */}
            {error && <div className="error-message">{error}</div>}

            {/* Sign In Button */}
            <button type="submit" className="login-button-signin">Reset Password →</button>
       
        </div>
      </form>
      <Footer />
     
    </div>
  );
};

export default Forgotpassword;