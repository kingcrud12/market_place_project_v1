// src/components/ResetPassword.tsx
import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de l'URL
  const [searchParams] = useSearchParams(); // Récupère le token
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const token = searchParams.get('token');
      const response = await fetch(`http://localhost:3000/market_place/v1/user/reset-password/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Envoie le token avec la requête
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Mot de passe réinitialisé avec succès !");
        navigate('/signin');
      } else {
        alert(`Erreur : ${data.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe :", error);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form-container">
        <h2>Réinitialiser votre mot de passe</h2>
        <form onSubmit={handleSubmit} className="reset-password-form">
          <label>Nouveau mot de passe</label>
          <input
            type="password"
            placeholder="Entrez un nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            placeholder="Confirmez le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="reset-password-button">Réinitialiser le mot de passe</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
