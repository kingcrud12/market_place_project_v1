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

const Signin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate(); // Initialisation du hook useNavigate

  return (
    <div className="signin">
      <Navigation />
      <BreadCrumb />
      <div className="body-signin">
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
              <input id="email" type="email" className="input-popup-signin"  />
            </div>

            {/* Password Input */}
            <div className="user-input-popup-signin">
              <div className="user-password-signin">
                <label htmlFor="password" className="label-password-signin">Password</label>
                <span className="forget-password-signin">Forget Password?</span>
              </div>
              <div className="password-container-signin">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input-popup-password-signin"
                />
                <img
                  src={showPassword ? EyeOffIcon : EyeIcon}
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  className="password-toggle-icon-signin"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

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
      </div>
      <Footer />
    </div>
  );
};

export default Signin;