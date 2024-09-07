import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = () => toast.info("This is a demo .");

const Toast = () => {
  return (
    <ToastContainer
      position="bottom-right"  
      autoClose={5000}        
      hideProgressBar={false} 
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Toast;
