import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type AlertType = 'success' | 'info' | 'warning' | 'danger';

interface Alert {
  id: string;
  type: AlertType;
  message: string;
  title?: string;
  duration?: number; 
}

interface AlertContextData {
  alerts: Alert[];
  showAlert: (type: AlertType, message: string, title?: string, duration?: number) => void;
  showError: (error: any) => void;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const removeAlert = useCallback((id: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  }, []);

  const showAlert = useCallback(
    (type: AlertType, message: string, title?: string, duration = 5000) => {
      const id = Math.random().toString(36).substring(2, 9);
      
      const newAlert: Alert = {
        id,
        type,
        message,
        title,
        duration,
      };

      setAlerts(prevAlerts => [...prevAlerts, newAlert]);

      if (duration > 0) {
        setTimeout(() => removeAlert(id), duration);
      }
    },
    [removeAlert]
  );

  const showError = useCallback(
    (error: any) => {
      let message = 'Ocorreu um erro inesperado';
      let title = 'Erro';

      if (typeof error === 'string') {
        message = error;
      } else if (error?.message) {
        message = error.message;
        
        if (error?.status) {
          title = `${error.status} - ${error.error || title}`;
        }
      }

      showAlert('danger', message, title);
    },
    [showAlert]
  );

  return (
    <AlertContext.Provider value={{ alerts, showAlert, showError, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};