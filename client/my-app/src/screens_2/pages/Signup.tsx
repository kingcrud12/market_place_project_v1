import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Navigation from './../components/Homepage/Navigation';
import BreadCrumb from './../components/Others/BreadCrumb';
import Footer from './../components/Homepage/Footer';
import Google from './../../assets_2/image/Login/Google.png';
import Apple from './../../assets_2/image/Login/Apple.svg';
import EyeIcon from '../../assets_2/icons/Regular/Eye.svg';
import EyeOffIcon from '../../assets_2/icons/Regular/PhoneCall.svg';

const Signup: React.FC = () => {
     const [showPassword, setShowPassword] = useState<boolean>(false);
     const navigate = useNavigate();

  return (
    <div className="signup">
      <Navigation />
      <BreadCrumb />
      <div className="body-signup">
        <div className="form-group-signup">
          {/* Header */}
          <div className="head-signup">
            {/* Onglet Sign In */}
            <div
              className="tab"
              onClick={() => navigate('/signin')} // Navigation programmatique
            >
              <span className="tab-label">Sign In</span>
            </div>
            {/* Onglet Sign Up */}
            
             <div className="tab active-tab">
              <span className="tab-label active-text">Sign Up</span>
              </div>
          </div>

          {/* Formulaire de connexion */}
          <div className="user-input-signup">
            {/* Email Input */}
            <div className="user-input-popup-signup">
              <label htmlFor="email" className="label-email-signup">Name</label>
              <input id="text" type="text" className="input-popup-signup"  />
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
                />
                <img
                  src={showPassword ? EyeOffIcon : EyeIcon}
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  className="password-toggle-icon-signup"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <div className="user-input-popup-signup">
              <div className="user-password-signup">
                <label htmlFor="password" className="label-password-signup">Confirm Password</label>
              </div>
              <div className="password-container-signup">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input-popup-password-signup"
                />
                <img
                  src={showPassword ? EyeOffIcon : EyeIcon}
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  className="password-toggle-icon-signup"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <div className="checkbox">
            <input type="checkbox" className='checkbox-input' /> 
                <span className="term-condition">
                Are you agree to Clicon <span className="different-color">Terms of Condition</span> and <span className="different-color">privacy Policy</span>.
                </span>
            </div>

            {/* Sign In Button */}
            <button type="submit" className="login-button-signup">Sign In →</button>
          </div>

          {/* Divider & External Login */}
          <div className="text-divider-signup">
            <span className="divider-label-signup">or</span>
          </div>
          <button className="external-login google-login">
            <img src={Google} alt="Google" />
            Sign up with Google
          </button>
          <button className="external-login apple-login">
            <img src={Apple} alt="Apple" />
            Sign up with Apple
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;