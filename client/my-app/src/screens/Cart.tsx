import React, { useEffect, useState } from 'react';
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
  const [selectedCart, setSelectedCart] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/market_place/v1/shop/user/carts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCarts(response.data);
      } catch (error) {
        console.error('Error fetching carts:', error);
        setErrorMessage('Erreur lors de la récupération des paniers.');
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/market_place/v1/shop/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setErrorMessage('Erreur lors de la récupération des produits.');
      }
    };

    fetchCarts();
    fetchProducts();
  }, [token]);

  const handleAddProduct = async (cartId: number, productId: number) => {
    try {
      await axios.post(`http://localhost:3000/market_place/v1/shop/user/cart/${cartId}/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axios.get('http://localhost:3000/market_place/v1/shop/user/carts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarts(response.data);
      setSelectedCart(null);  // Fermer le menu après ajout
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setErrorMessage('Erreur lors de l\'ajout du produit au panier.');
    }
  };

  const handleRemoveProduct = async (cartId: number, productId: number) => {
    try {
      await axios.delete(`http://localhost:3000/market_place/v1/shop/user/cart/Item/${cartId}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axios.get('http://localhost:3000/market_place/v1/shop/user/carts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarts(response.data);
    } catch (error) {
      console.error('Error removing product from cart:', error);
      setErrorMessage('Erreur lors de la suppression du produit du panier.');
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
              <h2>Panier numero: {cart.id}</h2>
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
                        <button onClick={() => setSelectedCart(selectedCart === cart.id ? null : cart.id)}>
                          <FaPlus /> Ajouter
                        </button>
                      </div>
                    </div>
                    {selectedCart === cart.id && (
                      <div className="dropdown-menu">
                        {products.map(product => (
                          <button
                            key={product.id}
                            onClick={() => handleAddProduct(cart.id, product.id)}
                          >
                            {product.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
