/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaCheck, FaExclamationCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { Flip, toast } from 'react-toastify';

const Layout = ({ icon, title, message }) => (
    <div>
        <div>
            <h4>
                {icon}
                {title}
            </h4>
        </div>
        <div style={{ fontSize: 'small' }}>{message}</div>
    </div>
);

const ShowMessage = (type, message, autoClose, toastId) => {
  if (!message) return;

  let icon = '';
  let title = '';
  switch (type) {
    case 'success':
      icon = <FaCheck />;
      title = ' Sucesso!';
      break;
    case 'info':
      icon = <FaExclamationCircle />;
      title = ' Atenção!';
      break;
    case 'warning':
      icon = <FaExclamationTriangle />;
      title = 'Alerta!';
      break;
    case 'error':
      icon = <FaTimes />;
      title = ' Erro!';
      break;
    default:
      break;
  }

  toast[type](<Layout icon={icon} title={title} message={message} />,
    {
      autoClose: autoClose,
      toastId: toastId,
      transition: Flip,
    });
};
export default ShowMessage;
