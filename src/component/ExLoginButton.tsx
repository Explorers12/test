import React from 'react';
import { Link } from 'react-router-dom';
import { fetchLogin } from '../util/fetchlogin';

type ExLoginButtonsProps = {
  onSubmit: () => void;
}

const ExLoginButtons: React.FC<ExLoginButtonsProps> = ({ onSubmit }) => {

  const handleGoogleLogin = async () => {
    try {
      const loginData = {
        email: 'user@example.com',
        password: 'password123'
      };
      const response = await fetchLogin(JSON.stringify(loginData));
      onSubmit();
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  return (
    <button className='flex--item s-btn s-btn__icon s-btn__google bar-md ba bc-black-100 bg-blue-300' onClick={handleGoogleLogin}>
        <div className="flex items-center justify-center align-items-center">
        <img src="./googlelogo.jpg" alt="Logo" className="mr-1 h-5 w-5 items-center justify-center" />
        <Link to={'http://localhost:8080/oauth2/authorization/google'} className="ml-2 items-center justify-center align-items-center">Login with Google</Link>
      </div>
      </button>
  );
};

export default ExLoginButtons;