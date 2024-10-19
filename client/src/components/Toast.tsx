import React from 'react';

interface ToastProps {
    message: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    return (
        <div className="fixed top-4 bg-red-500 text-white p-4 rounded shadow-lg">
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <button onClick={onClose} className="ml-4 text-xl">&times;</button>
            </div>
        </div>
    );
};

export default Toast;