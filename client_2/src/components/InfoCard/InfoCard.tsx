// src/components/InfoCard/InfoCard.tsx
import React from 'react';
import './InfoCard.css';
import { InfoCardProps } from './InfoCard.types';

const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => {
  return (
    <div className="info-card">
      <div className="icon-placeholder" />
      <div className="info-content">
        <h4 className="info-title">{title}</h4>
        <p className="info-description">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
