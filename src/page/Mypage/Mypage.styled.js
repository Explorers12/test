import styled from "styled-components"

export const Section = styled.section`
  width: 80%;
  
  .profile{
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 1.25rem 0;
  }
  .profile_img{
    height: 7.5rem;
    width: 7.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .profile_info{
    display: flex;
    flex-direction: column;
    gap: .9375rem;
  }
  .profile_user_name{
    font-size: 1.75rem;
    font-weight: 800;
  }
  .profile_user_state{
    display: flex;
    align-items: center;
    gap: .9375rem;
  }
  .profile_user_state button{
    font-size: .875rem;
    position: relative;
  }
  .profile_user_state button::after{
    content: "/";
    position: absolute;
    top: 0;
    right: -.4688rem;
  }
  .profile_user_state button:last-child::after{
    display: none;
  }
  .status_button{
    display: flex;
    gap: .625rem;
  }
  .status_button button{
    font-size: 1rem;
    border-radius: 20px;
    padding: .375rem .9375rem;
  }
  .status_button button.active{
    background-color: #f48225;
    color: #fff;
  }
`