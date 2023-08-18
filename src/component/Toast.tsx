import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const TOAST_ID = 'toast';
const TOAST_MS = 1500;

export const showToast = (message: string = 'default message', type: string = 'confirm'): void => {
  let container = document.getElementById(TOAST_ID);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', TOAST_ID);
    document.body.appendChild(container);
  }

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Toast message={message} type={type} />
    </React.StrictMode>
  );
};
export const HideToast = (target: any): void => {
    target.unmount();
  };

interface ToastProps {
  message: string;
  type: string;
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const toast = useRef<HTMLDivElement>(null);
  let timer = -1;

  const onStart = () => {
    timer = window.setTimeout(() => {
      if (toast.current) {
        document.getElementById(TOAST_ID)?.removeChild(toast.current);
      }
    }, TOAST_MS);
  };

  useEffect(() => {
    onStart();
  }, []);

  if (type === 'default') console.log(`✅ ${message}`);
  else if (type === 'danger') console.log(`🛑 ${message}`);

  return (
    <div className={`so-toast ${type === 'danger' ? 'so-toast-danger' : 'so-toast-confirm'}`} ref={toast}>
      {message}
    </div>
  );
};

export default Toast;