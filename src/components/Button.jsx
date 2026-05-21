import React from 'react';

export function Button({
    children,
    onClick,
    variant = 'primary',
    className = '',
    disabled = false,
    ...props
}) {
    const baseStyle = {
        padding: '16px 24px',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        borderRadius: '12px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const variants = {
        primary: { backgroundColor: '#0056b3', color: 'white' },
        danger: { backgroundColor: '#e53e3e', color: 'white' },
        success: { backgroundColor: '#38a169', color: 'white' },
        outline: { backgroundColor: 'transparent', color: '#0056b3', border: '2px solid #0056b3' },
        keypad: { backgroundColor: '#e2e8f0', color: '#1a202c', fontSize: '1.5rem', padding: '16px' },
    };

    const style = { ...baseStyle, ...variants[variant] };

    // Allow passing raw style to override
    const finalStyle = props.style ? { ...style, ...props.style } : style;

    return (
        <button
            style={finalStyle}
            onClick={onClick}
            disabled={disabled}
            className={`btn ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
