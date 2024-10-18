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
  stock: number; // Gestion de stock
}

interface HeroSectionProps {
  updateCartCount: (count: number) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ updateCartCount }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cartId, setCartId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts(); // Récupère les produits lors du chargement initial
    fetchActiveCart(); // Récupère le panier actif
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:3000/market_place/v1/shop/products");
      setProducts(response.data.products);
    } catch (error) {
      setError("Erreur lors de la récupération des produits");
    }
  };

  const fetchActiveCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Récupère le panier actif de l'utilisateur
      const response = await axios.get('https://localhost:3000/market_place/v1/shop/user/carts', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.cartId) {
        setCartId(response.data.cartId); // Stocke l'ID du panier actif
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du panier actif:', error);
    }
  };

  const handleAddToCart = async (product: Product) => {
    if (product.stock <= 0) {
      // Affiche l'alerte si le produit n'est pas en stock
      alert(`Le produit ${product.name} est en rupture de stock.`);

      // Relance l'appel pour récupérer les produits lorsque l'utilisateur clique sur "OK"
      fetchProducts();
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      let activeCartId = cartId;

      if (!activeCartId) {
        const response = await axios.get('https://localhost:3000/market_place/v1/shop/user/carts', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.length > 0) {
          activeCartId = response.data[0].id;
          setCartId(activeCartId);
        } else {
          const createCartResponse = await axios.post(
            'https://localhost:3000/market_place/v1/shop/user/cart',
            {
              products: [{ id: product.id, quantity: 1 }],
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          activeCartId = createCartResponse.data.cartId;
          setCartId(activeCartId);
          alert('Produit ajouté au panier!');
          return;
        }
      }

      await axios.put(
        `https://localhost:3000/market_place/v1/shop/user/cart/${activeCartId}/${product.id}`,
        {
          products: [{ id: product.id, quantity: 1 }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Produit ajouté au panier!');

      const cartResponse = await axios.get('https://localhost:3000/market_place/v1/shop/user/carts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (cartResponse.status === 200) {
        const totalItems = cartResponse.data.reduce((acc: number, cart: any) => {
          return acc + cart.products.reduce((acc: number, p: any) => acc + p.quantity, 0);
        }, 0);
        updateCartCount(totalItems); 
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  };

  if (error) {
    return <div className="custom-error-message">{error}</div>;
  }

  return (
    <section className="custom-hero-section">
      <h2>Nos Boissons</h2>
      <div className="custom-hero-grid">
        {products.length === 0 ? (
          <p>Aucun produit disponible pour le moment.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="custom-hero-card">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="custom-product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="custom-price-add-to-cart">
                <span className="custom-product-price">{product.price} €</span>
                <button
                  className="custom-add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock <= 0}
                  style={{
                    backgroundColor: product.stock <= 0 ? '#ccc' : '#28a745',
                    cursor: product.stock <= 0 ? 'not-allowed' : 'pointer'
                  }}
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
