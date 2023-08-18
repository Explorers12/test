import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../util/fetchlogin';

const LoginInfo: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const checkEmail = ():boolean => {
    if (!email) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
      return true;
    }
  };

  const checkPassword = ():boolean => {
    if (!password) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
      return true;
    }
  };

  const borderColor: { [key: string]: string } = {
    true: 'w-full px-2 py-1 border rounded border-danger-500',
    false: 'w-full px-2 py-1 border rounded border-soGray-light',
  };

  const validation = (): boolean => {
    checkEmail();
    checkPassword();
    return checkEmail() && checkPassword();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validation()) {
      onLoginData();
    }
  };
  
  const onLoginData = async () => {
    const loginData = JSON.stringify({
      email: email,
      password: password,
    });

    const goHome = () => {
      navigate('/');
    };

    const login = await fetchLogin(loginData);
    if (login.status === 200) {
      goHome();
      window.location.reload();
    }
  };

  return (
    <div className="flex-col justify-center my-5 align-middle min-w-[280px]">
      <div className="px-5 pt-3 pb-10 bg-white rounded-md drop-shadow-xl">
        <form className="form" onSubmit={onSubmit}>
          <div className="flex-col justify-center my-3">
            <div className="font-bold">Email</div>
            <input
              type="email"
              value={email}
              onChange={handleEmail}
              className={borderColor[emailError ? 'true' : 'false']}
            />
            {emailError && (
              <p className="text-xxs text-danger-500">Email cannot be empty.</p>
            )}
          </div>
          <div className="flex-col items-center justify-center my-3">
            <div className="flex items-center">
              <div className="font-bold">Password</div>
              <a
                tabIndex={-1}
                href="./login"
                className="ml-auto align-bottom text-xxs text-secondary-500 hover:text-secondary-300"
              >
                Forgot password?
              </a>
            </div>

            <input
              type="password"
              value={password}
              onChange={handlePassword}
              className={borderColor[passwordError ? 'true' : 'false']}
            />
            {passwordError && (
              <p className="text-xxs text-danger-500">
                Password cannot be empty.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="flex justify-center w-full mt-10 text-center so-button-primary"
          >
            Log in
          </button>
        </form>
      </div>
      <div className="flex justify-between mx-3 my-10 text-sm">
        <p>Don&apos;t have an account?</p>
        <a
          href="./signup"
          className="text-secondary-600 hover:text-secondary-300"
        >
          Sign up
        </a>
      </div>
    </div>
  );
};

export default LoginInfo;