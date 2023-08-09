import React from 'react';

export default function Number({ value, handleClick }) {
    return (
        <div>
            <button onClick={() => handleClick(value)}>{value}</button>
        </div>
    );
}