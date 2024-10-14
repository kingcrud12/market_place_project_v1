import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Importer le fichier de styles


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/market_place/v1/admin/products', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Vous devez être connecté pour supprimer des produits.');
      navigate('/');
      return;
    }

    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        const response = await fetch(`http://localhost:3000/market_place/v1/admin/product/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du produit');
        }

        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard">
      <h1>Catalogue de Boissons</h1>
      <div className="actions-container">
        <Link to="/admin/products/add" className="add-product-link">Ajouter un nouveau produit</Link>
        <a href="/adminhome" className="dashboard-return-button">Retour à l'accueil</a>
      </div>
      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td><img src={`${product.imageUrl}`} alt={product.name} className="product-image" /></td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price} €</td>
                <td>
                  <Link to={`/admin/products/edit/${product.id}`} className="edit-button">Modifier</Link>
                  <button onClick={() => handleDelete(product.id)} className="delete-button">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
