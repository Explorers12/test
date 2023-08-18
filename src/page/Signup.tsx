import React from 'react';
import Signicon from '../component/Signicon';
import SignupInfo from '../component/SignupInfo';
import Sidebar from '../component/Sidebar';

const Signup: React.FC = () => {
  return (
    <div className='flex flex-grow'>
      <Sidebar/>
    <div className="pt-11 flex items-center justify-center h-screen flex flex-grow">
      <div className="flex w-full max-w-lg p-8 rounded-lg shadow">
        <div className="flex items-center justify-center mb-6 w-full box-content">
          <Signicon />
        </div>
        <div className="flex-grow transition-all duration-300 w-full box-content pb-20">
          <SignupInfo />
        </div>
      </div>
    </div>
   </div> 
  );
};

export default Signup;