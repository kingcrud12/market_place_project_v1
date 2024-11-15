import React from 'react';
import ArrowRightWhite from '../../../assets_2/icons/Regular/Regular/ArrowRight.svg';
import Google from '../../../assets_2/branding/logo/google-2015 1.svg';
import Amazon from '../../../assets_2/branding/logo/Frame.svg';
import Philips from '../../../assets_2/branding/logo/philips 1.svg';
import Toshiba from '../../../assets_2/branding/logo/toshiba-1 1.svg';
import Samsung from '../../../assets_2/branding/logo/samsung-4 1.svg';
import './Newsletter.css'

function Newsletter () {

    const handleSearch = () => {
        console.log("Icône de recherche cliquée !");
      };

    return (
       
       <div className= 'newsletter-general'>
        <div className= 'newsletter-content'>
            <span className= 'newsletter-title'>Subscribe to our newsletter</span>
            <span className= 'newsletter-substitle'>
                Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et cursus. Donec non quam urna. Quisque vitae porta ipsum.
            </span>
        </div>

        <div className= 'newsletter-search'>
          <input type="text" placeholder='Email address' className='newsletter-input-search' />
          <button onClick={handleSearch} className="newsletter-search-button" aria-label="Search">
            Subscribe
            <img src={ArrowRightWhite} alt='Search' className= 'newsletter-search-icon' />
          </button>
        </div>
        <span className='newsletter-line'></span>
        <div className='newsletter-logo'>
            <img src={Google} alt='' />
            <img src={Amazon} alt='' />
            <img src={Philips} alt='' />
            <img src={Toshiba} alt='' />
            <img src={Samsung} alt='' />
        </div>
        
        
       </div>

    
    
    );
};

export default Newsletter;