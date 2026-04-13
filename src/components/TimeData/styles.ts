import React from 'react';

export const TimeNowStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '60px',
    left: '0',
    transformOrigin: 'left top',
    zIndex: 100,
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'Inter, system-ui, monospace',
    pointerEvents: 'none',
    fontSize: '11px',
    fontWeight: 600,
    backgroundColor: 'rgb(74 21 21 / 55%)',
    padding: '4px 10px',
    borderRadius: '0 0 8px 8px',
    letterSpacing: '1.5px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    transform: 'rotate(270deg)',
};