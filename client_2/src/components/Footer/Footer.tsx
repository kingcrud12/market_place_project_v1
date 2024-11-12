// src/components/Footer/Footer.tsx
import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Clicon Online Store. Tous droits réservés.</p>
        <div className="social-icons">
          <span>Suivez-nous :</span>
          <a href="#" aria-label="Facebook" className="icon facebook"></a>
          <a href="#" aria-label="Twitter" className="icon twitter"></a>
          <a href="#" aria-label="Instagram" className="icon instagram"></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
