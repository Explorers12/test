import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchSignup } from '../util/fetchsignup';

const SignupInfo: React.FC = () => {
  const navigate = useNavigate();
  const defaultImage = useRef<HTMLImageElement | null>(null);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const checkUsername = (): boolean => {
    const usernameRegexp = /^[a-zA-Z가-헿0-9]{4,}$/;
    if (!username || !usernameRegexp.test(username)) {
      setUsernameError(true);
      return false;
    } else {
      setUsernameError(false);
      return true;
    }
  };
  const checkEmail = (): boolean => {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegexp.test(email)) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
      return true;
    }
  };
  const checkPassword = (): boolean => {
    const passwordRegexp =
      /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d`~!@#$%^&*()-_=+]{8,}$/;
    if (!password || !passwordRegexp.test(password)) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
      return true;
    }
  };

  const validation = (): boolean => {
    const isUsernameValid = checkUsername();
    const isEmailValid = checkEmail();
    const isPasswordValid = checkPassword();

    if (isUsernameValid && isEmailValid && isPasswordValid) {
      console.log('✅ Form data is valid.');
      return true;
    } else {
      console.log('❌ Form data is invalid.');
      return false;
    }
  };

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (validation()) {
      console.log('✅ Form submitted.');
      await onUpload();
    }
  };

  const dataURLtoFile = (dataurl: string, fileName: string): File => {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);

    for (let i = 0; i < n; ++i) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  const getImage = async (): Promise<File> => {
    const b64data = defaultImage.current!.currentSrc;
    const imagefile = dataURLtoFile(b64data, 'defaultImage.jpeg');
    return imagefile;
  };

  const onUpload = async (): Promise<void> => {
    const formData = new FormData();
    const finalImage = await getImage();
    formData.append('profile', finalImage);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('nickname', username);

    const goLogin = () => {
      navigate('/login');
    };

    try {
      const response: any = await fetchSignup(formData);
      if (response.status === 201) {
        console.log('✅ Signup successful.');
        goLogin();
      } else {
        console.log('❌ Signup failed.');
      }
    } catch (error) {
      console.error('❌ Error during signup:', error);
    }
  };

  const borderColor = {
    'true': 'border-danger-500',
    'false': 'border-soGray-light',
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-soGray-bg">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Create an Account</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUserName}
              className={`w-full px-3 py-2 border rounded ${borderColor[usernameError ? 'true' : 'false']} focus:ring focus:ring-opacity-50`}
            />
            {usernameError && (
              <p className="mt-1 text-xs text-danger-500">
                4 characters minimum, no special characters.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmail}
              className={`w-full px-3 py-2 border rounded ${borderColor[emailError ? 'true' : 'false']} focus:ring focus:ring-opacity-50`}
            />
            {emailError && (
              <p className="mt-1 text-xs text-danger-500">
                Invalid email format.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
              className={`w-full px-3 py-2 border rounded ${borderColor[passwordError ? 'true' : 'false']} focus:ring focus:ring-opacity-50`}
            />
            {passwordError && (
              <p className="mt-1 text-xs text-danger-500">
                Minimum 8 characters, at least 1 letter and 1 number.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-buttonPrimary hover:bg-buttonPrimaryHover rounded-md"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-buttonPrimary">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupInfo;