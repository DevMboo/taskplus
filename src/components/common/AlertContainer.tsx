import React from 'react';
import { useAlert } from '@/contexts/AlertContext';

export const AlertContainer: React.FC = () => {
  const { alerts, removeAlert } = useAlert();

  if (!alerts.length) return null;

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'info':
        return 'bg-blue-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'danger':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-full max-w-xs">
      {alerts.map(alert => (
        <div
          key={alert.id}
          className={`${getAlertColor(alert.type)} text-white px-4 py-3 rounded-lg shadow-lg relative`}
          role="alert"
        >
          {alert.title && <strong className="font-bold block">{alert.title}</strong>}
          <span className="block sm:inline">{alert.message}</span>
          <button
            onClick={() => removeAlert(alert.id)}
            className="absolute top-1 right-1 text-white hover:text-gray-200 cursor-pointer"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      ))}
    </div>
  );
};