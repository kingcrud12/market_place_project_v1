import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminOrders.css'; // Importer le fichier de styles

interface Order {
  id: number;
  consummerId: number;
  cartId: number;
  price: number;
  status: string;
  productIds: string;
  createdAt: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('https://localhost:3000/market_place/v1/admin/orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des commandes');
        }

        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) return <p>Chargement en cours...</p>;

  return (
    <div className="admin-orders">
      <h1>Commandes</h1>
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID Commande</th>
              <th>ID Client</th>
              <th>ID Panier</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Produits Commandés</th>
              <th>Date de création</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.consummerId}</td>
                <td>{order.cartId}</td>
                <td>{order.price} €</td>
                <td>{order.status}</td>
                <td>{order.productIds}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="orders-return-button" onClick={() => navigate('/adminhome')}>
        Retour à l'accueil
      </button>
    </div>
  );
};

export default AdminOrders;
