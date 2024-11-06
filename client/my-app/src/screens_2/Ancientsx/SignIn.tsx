import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignIn.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetLinkVisible, setResetLinkVisible] = useState(false); // Gérer l'affichage du lien de réinitialisation
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:3000/market_place/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Connexion réussie !");
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(`Erreur : ${data.message}`);
        setResetLinkVisible(true); // Afficher le lien si le login échoue
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Fonction pour demander la réinitialisation du mot de passe
  const requestPasswordReset = async () => {
    try {
      const response = await fetch(`https://localhost:3000/market_place/v1/user/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }) // Envoyer l'email dans le body
      });

      if (response.ok) {
        alert('Un lien de réinitialisation de mot de passe vous a été envoyé.');
      } else {
        const data = await response.json();
        alert(`Erreur : ${data.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la demande de réinitialisation de mot de passe:', error);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="signin-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="signin-button">Sign In</button>
          {error && <p className="error-message">{error}</p>}
          {resetLinkVisible && (
            <p className="reset-password">
              Mot de passe oublié ?{' '}
              <Link to="#" onClick={requestPasswordReset}>
                Réinitialisez votre mot de passe en cliquant sur ce lien
              </Link>.
            </p>
          )}
          <p className="signup-redirect">
            Vous n'avez pas de compte ?{' '}
            <Link to="/signup" className="signup-link">
              Créez votre compte en cliquant ici
            </Link>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
