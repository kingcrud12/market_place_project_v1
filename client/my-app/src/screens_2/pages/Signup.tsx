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
import { API_URL } from '../../secret';

const Signup: React.FC = () => {
     const [showPassword, setShowPassword] = useState<boolean>(false);
     const navigate = useNavigate();
     const [name, setName] = useState ('');
     const [email, setEmail] = useState ('');
     const [password, setPassword] = useState ('');
     const [confirmEmail, setconfirmEmail] = useState ('');
     const [error, setError] = useState ('');

     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            alert("Inscription réussie !");
          const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, confirmEmail}),
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
    <div className="signup">
      <Navigation />
      <BreadCrumb />
      <form onSubmit={handleSubmit} className="body-signup">
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
              <input 
                id="Name" 
                type="text" 
                placeholder='name'
                className="input-popup-signup"
                value= {name}
                onChange={(e) => setName(e.target.value)}
                required  
                 />

            </div>

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

            <div className="user-input-popup-signin">
              <label htmlFor="email" className="label-email-signin"> Confirm Email Address</label>
              <input  
              id="confirmEmail" 
              type="email" 
              placeholder="Confirm Email"
              className="input-popup-signin" 
              value= {confirmEmail}
              onChange={(e) => setconfirmEmail(e.target.value)}
              required 
              />
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

             {/* Affichage de l'erreur */}
             {error && <div className="error-message">{error}</div>}

            <div className="checkbox">
            <input type="checkbox" className='checkbox-input' /> 
                <span className="term-condition">
                Are you agree to Clicon <span className="different-color">Terms of Condition</span> and <span className="different-color">privacy Policy</span>.
                </span>
            </div>

            {/* Sign In Button */}
            <button type="submit" className="login-button-signup">Sign Up →</button>
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
      </form>
      <Footer />
    </div>
  );
};

export default Signup;