import React, { useState } from 'react';
import './Topwidget.css';
import xIcon from '../../../assets_2/icons/Duotone/X.svg'
import shopIcon from '../../../assets_2/icons/Regular/ArrowRight.svg';

function Topwidget() {
    // Utilise le hook d'état "useState" pour gérer la visibilité du widget
    // isVisible est initialisé à "true" (le widget est visible par défaut).
    // setIsVisible est une fonction qui permet de modifier la valeur de isVisible.
    const [isVisible, setIsVisible] = useState(true);

    // Fonction pour fermer le widget
    // Lorsque cette fonction est appelée, elle définit isVisible à "false",
    // ce qui masque le widget en modifiant son état.
    const handleClose = () => {
        setIsVisible(false);
      };
    
      if (!isVisible) return null; // Ne pas afficher si isVisible est false
    
      return (
        <div className="top-widget">
          <div className='centered-container'>
          {/*Elemant Black Friday */}
          <span className='black-global'>
            <span className='black-icone'>Black</span>
            <span className='friday-text'>Friday</span>
          </span>
           {/*Element central up 59 pourcent*/}
          <span className='global-text'>
            <span className= 'Up-text'>Up to</span>
            <span className='pourcent-text'>59%</span>
            <span className= 'off-text'>OFF</span>
          </span>
        
            {/*Bouton shopnow*/}
            <a href='https://www.google.fr/' className='shop-button' target='_blank' rel='noopener noreferrer'>
                <span className= 'shop-text'>Shop now</span>
                <img src={shopIcon} alt="buttonshop" className='shop-icon'/>
            </a>
           
          </div>
          <div className= 'button-space'>
          {/* Bouton de fermeture  du widget*/}
         <button className="close-button" onClick={handleClose}>
         <img src= {xIcon} alt= "Close" className='x-icon' />
         </button>
         </div>
        </div>
         
        
      );

}

export default Topwidget