import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './Cart.css';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartProduct {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

interface Cart {
  id: number;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
}

const CartPage: React.FC = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showProducts, setShowProducts] = useState<boolean>(false); // Contrôle d'affichage des produits
  const [selectedCart, setSelectedCart] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get('https://localhost:3000/market_place/v1/shop/user/carts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCarts(response.data);
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    };

    fetchCarts();
  }, [token]);

  // Fonction pour récupérer la liste des produits
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://localhost:3000/market_place/v1/shop/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.products); // S'assurer que la structure des données est correcte
      setShowProducts(true); // Afficher la liste des produits
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
      setErrorMessage('Erreur lors de la récupération des produits.');
    }
  };

  const handleAddProduct = async (cartId: number, productId: number) => {
    try {
      await axios.put(
        `https://localhost:3000/market_place/v1/shop/user/cart`,
        {
          products: [{ id: productId, quantity: 1 }],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // Mise à jour du panier après ajout
      const response = await axios.get('https://localhost:3000/market_place/v1/shop/user/carts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarts(response.data);
      setShowProducts(false); // Masquer la liste des produits après ajout
      setSelectedCart(null); // Réinitialiser la sélection du panier
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setErrorMessage("Erreur lors de l'ajout du produit au panier.");
    }
  };

  const handleRemoveProduct = async (cartId: number, productId: number, quantity: number = 1) => {
    try {
      await axios.delete(`https://localhost:3000/market_place/v1/shop/user/cart/Item/${cartId}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId, quantity },
      });

      // Mise à jour du panier après suppression
      const response = await axios.get('https://localhost:3000/market_place/v1/shop/user/carts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarts(response.data);
    } catch (error) {
      console.error('Error removing product from cart:', error);
      setErrorMessage('Erreur lors de la suppression du produit du panier.');
    }
  };

  const handleCreateOrder = async (cartId: number) => {
    try {
      const response = await axios.post(
        'https://localhost:3000/market_place/v1/shop/user/order',
        { cartId: cartId.toString() }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newOrderId = response.data.id; 
      navigate(`/order-details/${newOrderId}/${cartId}`); 
    } catch (error) {
      console.error('Error creating order:', error);
      setErrorMessage('Erreur lors de la création de la commande.');
    }
  };

  return (
    <div className="cart-page">
      <h1>Vos paniers</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {carts.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div className="panier-grid">
          {carts.map(cart => (
            <div key={cart.id} className="panier">
              <h2>Votre Panier</h2>
              {cart.products.length === 0 ? (
                <p>Aucun produit dans ce panier.</p>
              ) : (
                cart.products.map(({ id, product, quantity }) => (
                  <div key={id} className="cart-product">
                    <div className="cart-product-box">
                      <div className="panier-image-container">
                        <img src={product.imageUrl} alt={product.name} />
                      </div>
                      <div className="panier-info">
                        <h3>{product.name}</h3>
                        <p>Prix: {product.price} €</p>
                        <p>Quantité: {quantity}</p>
                      </div>
                      <div className="panier-actions">
                        <button onClick={() => handleRemoveProduct(cart.id, product.id)}>
                          <FaMinus /> Retirer
                        </button>
                        <button onClick={() => { setSelectedCart(cart.id); fetchProducts(); }}>
                          <FaPlus /> Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {cart.products.length > 0 && (
                <div className="checkout-button-container">
                  <button
                    className="checkout-button"
                    onClick={() => handleCreateOrder(cart.id)}
                  >
                    Créer la commande
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Affichage de la liste des produits */}
      {showProducts && (
        <div className="product-list">
          <h2>Ajouter un produit</h2>
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Prix: {product.price} €</p>
                <button onClick={() => handleAddProduct(selectedCart!, product.id)}>
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;