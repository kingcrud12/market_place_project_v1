import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import './Forgotpassword.css';
import Navigation from './../components/Homepage/Navigation';
import BreadCrumb from './../components/Others/BreadCrumb';
import Footer from './../components/Homepage/Footer';
import { API_URL } from '../../secret';

const Forgotpassword: React.FC = () => {
  const navigate = useNavigate(); // Initialisation du hook useNavigate
  const [email, setEmail] = useState ('');
  const [error, setError] = useState ('');
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        alert("Lien envoyé");

        // Ajout de l'email dans la query string
        const response = await fetch(`${API_URL}/auth/confirm-email?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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
            
              <span className="tab-label-forget">Forget Password</span>
              <span className="tab-second-label">
                Enter the email address or mobile phone number associated with your Clicon account.
              </span>
         
         </div>

         
          
            {/* Email Input */}
            <div className="user-input-popup-signin">
              <label htmlFor="email" className="label-email-signin">Email Address</label>
              <input  
              id="email" 
              type="email" 
              placeholder="Email"
              className="input-popup-signin-forget" 
              value= {email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              />
            </div>
            
            

             {/* Affichage de l'erreur */}
            {error && <div className="error-message">{error}</div>}

            {/* Sign In Button */}
            <button type="submit" className="login-button-signin">Send code →</button>
           
           <div className="information-forget">
              <span className="already-forget">Already have account? 
                <span onClick={() => navigate('/signin')} className="lien-forget">Sign In</span>
              </span>
              <span className="dont-forget">Don’t have account? 
                <span onClick={() => navigate('/signup')} className="lien-forget">Sign Up</span>
              </span>
           </div>

          {/* Divider & External Login */}
          <div className="text-divider-signin-forget">
            <span className="divider-label-signin"></span>
          </div>

          <span className="customer-forget">
          You may contact <span className="customer-style">Customer Service</span> for help restoring access to your account.
          </span>
       
        </div>
      </form>
      <Footer />

      <button
        onClick={() => navigate('/resetnewpassword')}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: '#FF7A00',
          color: '#FFF',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Test
        </button>
    </div>
  );
};

export default Forgotpassword;