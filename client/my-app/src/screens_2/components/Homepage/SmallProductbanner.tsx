import React from 'react';
import ArrowRightWhite from '../../../assets_2/icons/Regular/Regular/ArrowRight.svg';
import './SmallProductBanner.css';

interface SmallProductBannerProps {
    title: string;
    subtitle: string;
    imageSrc: string;
    price?: string; // Optionnel
    buttonText: string;
    bgColor?: string;
    badgeText?:string;
}

const SmallProductBanner: React.FC<SmallProductBannerProps & { className?: string }> = ({ title, subtitle, imageSrc, price, buttonText, bgColor, badgeText, className }) => {
    return (
        <div className={`small-banner ${className || ''}`} style={{ backgroundColor: bgColor }}>
            
            <div className="small-banner-content">
            {badgeText && <span className="small-banner-badge">{badgeText}</span>}
                <span className="small-banner-title">{title}</span>
                <span className="small-banner-subtitle">{subtitle}</span>
                <button className="small-banner-button">{buttonText}
                    <img src={ArrowRightWhite } alt='' />
                </button>
            </div>
            {price && <span className="small-banner-price">{price}</span>}
            <div className="small-banner-image-wrapper">
                <img src={imageSrc} alt={title} className="small-banner-image" />
                
            </div>
             
        </div>
    );
};

export default SmallProductBanner;