import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminUsers.css'; // Importer le fichier de styles
import { API_URL } from "../secret";

interface User {
  id: number;
  name: string;
  email: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/admin/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs');
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Vous devez être connecté pour supprimer des utilisateurs.');
      navigate('/');
      return;
    }

    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        const response = await fetch(`${API_URL}/admin/user/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de l’utilisateur');
        }

        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression de l’utilisateur:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-users">
      <h1>Utilisateurs</h1>
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Identifiant client</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)} className="delete-button">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="users-return-button" onClick={() => navigate('/adminhome')}>Retour à l'accueil</button>
    </div>
  );
};

export default AdminUsers;
