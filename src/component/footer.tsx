import React from "react";
const Footer = () => {
    return (
      <footer className="flex-col">
        <div className="flex px-4 pt-8 align-top h-[120px] text-soGray-light bg-soGray-footerbg">
          <div className="flex mx-5">어떤이미지넣는곳</div>
          <h1> {sessionStorage.getItem("memberEmail")} </h1>
          <div className="mt-2 mb-10 grow">
            <div className="font-bold">STACK OVERFLOW</div>
            <div className="mt-4 text-xxs">
              Site design / logo © 2022 Stack Exchange Inc; user contributions
              licensed under CC BY-SA. rev 2022.10.28.42999
            </div>
          </div>
          <div className="flex mx-2 mt-2">
            <a href="/" className="mx-1">
              Questions
            </a>
            <a href="https://stackoverflow.com/help" className="mx-1">
              Help
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;