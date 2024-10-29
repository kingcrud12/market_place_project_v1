import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminHeroSection.css";
import { API_URL } from "../secret";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const AdminHeroSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/shop/products`);
        setProducts(response.data.products);
      } catch (error) {
        setError("Erreur lors de la récupération des produits");
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <section className="admin-hero-section">
      <div className="admin-hero-grid">
        {products.length === 0 ? (
          <p>Aucun produit disponible pour le moment.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="admin-hero-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="product-price">{product.price} €</span>
              {/* Vous pouvez ajouter des boutons pour éditer ou supprimer le produit */}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default AdminHeroSection;
