import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './OrderDetails.css';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartProduct {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

interface Order {
  id: number;
  consummerId: number;
  cartId: number;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Cart {
  id: number;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
}

const OrderDetails: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  // Utiliser useParams pour récupérer l'orderId et le cartId depuis la route dynamique
  const { orderId, cartId } = useParams<{ orderId: string; cartId: string }>();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:3000/market_place/v1/shop/user/orderDetails/${orderId}/${cartId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrder(response.data.order); // On récupère les informations de commande
        setCart(response.data.cart); // On récupère les détails du panier
      } catch (error) {
        console.error('Error fetching order details:', error);
        setErrorMessage('Erreur lors de la récupération des détails de la commande.');
      }
    };

    if (orderId && cartId) {
      fetchOrderDetails();
    }
  }, [orderId, cartId, token]);

  // Fonction de paiement (Stripe)
  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        'https://localhost:3000/market_place/v1/create-payment-session',
        { orderId }, // Envoyer l'ID de la commande au backend
        { headers: { Authorization: `Bearer ${token}` } } // Ajouter le token pour l'authentification
      );
  
      const { url } = response.data; // Récupérer l'URL de redirection Stripe dans la réponse
  
      console.log('Stripe URL:', url); // Log pour vérifier l'URL Stripe
  
      // Mettre en place un délai de 2 secondes (2000 ms) avant la redirection
      setTimeout(() => {
        window.location.href = url; // Rediriger l'utilisateur vers Stripe
      }, 2000); // Délai de 2 secondes
  
    } catch (error) {
      console.error('Error during checkout:', error);
      setErrorMessage('Erreur lors de la création de la session de paiement.');
    }
  };

  return (
    <div className="order-details-page">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {order && cart ? (
        <div className="order-card">
          {/* Affichage du numéro de commande */}
          <h2>Votre commande</h2>
          
          {/* Affichage de la date de création */}
          <p>Date de création: {new Date(order.createdAt).toLocaleString()}</p>

          <div className="order-products">
            {/* Vérification si cart.products existe avant d'utiliser map() */}
            {cart.products && cart.products.length > 0 ? (
              cart.products.map(({ product, quantity }) => (
                <div key={product.id} className="order-product">
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>Prix: {product.price} €</p>
                    <p>Quantité: {quantity}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucun produit dans cette commande.</p>
            )}
          </div>

          {/* Affichage du montant total */}
          <h3>Total: {order.price ? `${order.price} €` : 'Montant non disponible'}</h3>

          <button className="checkout-button" onClick={handleCheckout}>
            Payer la commande
          </button>
        </div>
      ) : (
        <p>Chargement des détails de la commande...</p>
      )}
    </div>
  );
};

export default OrderDetails;
