import React from 'react';
import LargeProductBanner from './LargeProductBanner';
import MacBook from '../../../assets_2/image/macbookpro.png'
import './LargeBanner.css';

function LargeBanner() {
    return (
        <div className='Large-banner'>
            

            {/* Large single product banner */}
            <LargeProductBanner
                title="Macbook Pro"
                description="Apple M1 Max Chip, 32GB Unified Memory, 1TB SSD Storage"
                imageSrc= {MacBook}
                buttonText="Shop Now"
                price="$1999"
                badgeText="Limited Time Offer"
            />
        </div>
    );
}

export default LargeBanner;