import React from 'react';
import './Loader.scss';

const Loader = () => (
    <div className="loading-container">
        <h2 className="loading-text">Загружаем товары...</h2>
        <div className="loading-spinner"></div>
    </div>
);

export default Loader;
