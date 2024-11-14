import React from 'react';
import SmallProductBanner from './SmallProductbanner';
import HomePode from '../../../assets_2/products/image_homepod.png';
import XiaomiPhone from '../../../assets_2/products/xiaomiPhone.png'
import './SmallBanner.css';

function SmallBanner() {
    return (
        <div>
            {/* Row with two small product banners */}
            <div className="small-banner-row">
                <SmallProductBanner
                    className="first-banner"
                    title="New Apple Homepod Mini"
                    subtitle="Jam-packed with innovation, HomePod mini delivers unexpectedly."
                    imageSrc={HomePode}
                    buttonText="Shop Now"
                    badgeText="Introducing"
                />
                <SmallProductBanner
                    className="second-banner"
                    title="Xiaomi Mi 11 Ultra 12GB+256GB"
                    subtitle="Data provided by internal laboratories. Industry measurement."
                    imageSrc={XiaomiPhone}
                    buttonText="Shop Now"
                    price="$590"
                    badgeText="Introducing New"
                />
            </div>

        
        </div>
    );
}

export default SmallBanner;