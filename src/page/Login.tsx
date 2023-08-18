import React from 'react';
import Logincomponent from '../component/Logincomponent';
import ExLoginButtons from '../component/ExLoginButton';
import Sidebar from '../component/Sidebar';

const Login:React.FC = () => {



  return(
    <div className='flex flex-grow'>
  <Sidebar />
  <div className='flex justify-center w-full align-center bg-soGray-bg flex-grow'>
    <div className='flex-col justify-center mb-auto pt-14'>
      <div className='flex items-center justify-center mx-2 my-10'>
        <p>Stack overflow</p>
      </div>
      <div className='flex flex-grow mx-auto d-flex flex__fl-grow1 fd-column gs8 gsy mb16 wmx3 ml-auto ml-12 pr-12 bg-blue'>
        <ExLoginButtons
          onSubmit={() => {
          }}
        />
      </div>
      <Logincomponent />
    </div>
  </div>
</div>
  )
}
export default Login;