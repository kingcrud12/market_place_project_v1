import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import './Signin.css';
import Navigation from './../components/Homepage/Navigation';
import BreadCrumb from './../components/Others/BreadCrumb';
import EyeIcon from '../../assets_2/icons/Regular/Eye.svg';
import EyeOffIcon from '../../assets_2/icons/Regular/PhoneCall.svg';
import Footer from './../components/Homepage/Footer';
import Google from './../../assets_2/image/Login/Google.png';
import Apple from './../../assets_2/image/Login/Apple.svg';
import { API_URL } from '../../secret';

const Signin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate(); // Initialisation du hook useNavigate
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
    }
  };
  

  return (
    <div className="signin">
      <Navigation />
      <BreadCrumb />
      <form onSubmit={handleSubmit} className="body-signin">
        <div className="form-group-signin">
          {/* Header */}
          <div className="head-signin">
            {/* Onglet Sign In */}
            <div className="tab active-tab">
              <span className="tab-label active-text">Sign In</span>
            </div>
            {/* Onglet Sign Up */}
            <div
              className="tab"
              onClick={() => navigate('/signup')} // Navigation programmatique
            >
              <span className="tab-label">Sign Up</span>
            </div>
          </div>

          {/* Formulaire de connexion */}
          <div className="user-input-signin">
            {/* Email Input */}
            <div className="user-input-popup-signin">
              <label htmlFor="email" className="label-email-signin">Email Address</label>
              <input  
              id="email" 
              type="email" 
              placeholder="Email"
              className="input-popup-signin" 
              value= {email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              />
            </div>

            {/* Password Input */}
            <div className="user-input-popup-signin">
              <div className="user-password-signin">
                <label htmlFor="password" className="label-password-signin">Password</label>
                <span  onClick={() => navigate('/forgotpassword')}  className="forget-password">Forget Password?</span>
              </div>
              <div className="password-container-signin">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder='password'
                  className="input-popup-password-signin"
                  value= {password}
                  onChange={(e) => setPassword(e.target.value)}

                />
                <img
                  src={showPassword ? EyeOffIcon : EyeIcon}
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  className="password-toggle-icon-signin"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

             {/* Affichage de l'erreur */}
            {error && <div className="error-message">{error}</div>}

            {/* Sign In Button */}
            <button type="submit" className="login-button-signin">Sign In →</button>
          </div>

          {/* Divider & External Login */}
          <div className="text-divider-signin">
            <span className="divider-label-signin">or</span>
          </div>
          <button className="external-login google-login">
            <img src={Google} alt="Google" />
            Login with Google
          </button>
          <button className="external-login apple-login">
            <img src={Apple} alt="Apple" />
            Login with Apple
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Signin;