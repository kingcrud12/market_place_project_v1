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
  const [cartId, setCartId] = useState<number | null>(null); // Stocke l'ID du panier actif

  useEffect(() => {
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

    fetchProducts();
    fetchActiveCart();
  }, []);

  
  const handleAddToCart = async (product: Product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
  
      // Vérifier si un panier actif est déjà défini dans le state
      let activeCartId = cartId;
  
      // Si pas de panier actif dans le state, récupérer le panier existant côté backend
      if (!activeCartId) {
        const response = await axios.get('https://localhost:3000/market_place/v1/shop/user/carts', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.data && response.data.length > 0) {
          // Utiliser le premier panier récupéré (ou gérer autrement si plusieurs paniers)
          activeCartId = response.data[0].id;
          setCartId(activeCartId);
        } else {
          // Si pas de panier existant, en créer un nouveau
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
          setCartId(activeCartId); // Stocker l'ID du panier nouvellement créé
          alert('Produit ajouté au panier!');
          return;
        }
      }
  
      // Ajoute le produit au panier existant avec la route PUT
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
  
      // Mise à jour du nombre d'articles dans le panier
      const cartResponse = await axios.get('https://localhost:3000/market_place/v1/shop/user/carts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (cartResponse.status === 200) {
        const totalItems = cartResponse.data.reduce((acc: number, cart: any) => {
          return acc + cart.products.reduce((acc: number, p: any) => acc + p.quantity, 0);
        }, 0);
        updateCartCount(totalItems); // Mise à jour du compteur de panier
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
