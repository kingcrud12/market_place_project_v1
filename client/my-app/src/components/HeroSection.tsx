import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import "./HeroSection.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface HeroSectionProps {
  updateCartCount: (count: number) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ updateCartCount }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/market_place/v1/shop/products");
        setProducts(response.data.products);
      } catch (error) {
        setError("Erreur lors de la récupération des produits");
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
  
      const response = await fetch('http://localhost:3000/market_place/v1/shop/user/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          products: [{ id: product.id, quantity: 1 }],
        }),
      });
  
      if (response.ok) {
        alert('Produit ajouté au panier!');
        // Mise à jour du nombre d'articles dans le panier
        const cartResponse = await fetch('http://localhost:3000/market_place/v1/shop/user/carts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (cartResponse.ok) {
          const data = await cartResponse.json();
          const totalItems = data.reduce((acc: number, cart: any) => {
            return acc + cart.products.reduce((acc: number, p: any) => acc + p.quantity, 0);
          }, 0);
          updateCartCount(totalItems); // Mise à jour du compteur de panier
        }
      } else {
        const data = await response.json();
        alert(`Erreur lors de l'ajout au panier : ${data.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  };
  

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <section className="hero-section">
      <h2>Nos Boissons</h2>
      <div className="hero-grid">
        {products.length === 0 ? (
          <p>Aucun produit disponible pour le moment.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="hero-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="price-add-to-cart">
                <span className="product-price">{product.price} €</span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default HeroSection;
