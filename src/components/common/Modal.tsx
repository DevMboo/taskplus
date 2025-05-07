import React from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(36,36,36,0.7)] bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
                <button
                    type='button'
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={onClose}
                >
                    ✕
                </button>
                {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
                {children}
            </div>
        </div>
    );
};

export default Modal;
