import { styled } from "styled-components";


export const AskButton = styled.button`
    background-color: rgb(10, 149, 255);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    text-decoration: none;
    width: 100px;
    height: 35px;
    font-size: 13px;
  
    &:hover {
      background-color:hsl(206,100%,40%);
    }
  
    &:focus {
      box-shadow: 0px 0px 0px 4px hsl(206,96%,90%);
      border-color: hsl(206,85%,57.5%);
    }
 `;


export const PageButton = styled.button`
  padding-left: 10px;
  padding-right: 10px;
  margin: 2px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 12px;
  height: 25px;

  background-color: ${props => (props.bgColor ? 'orange' : 'white')}; /* bgColor 값에 따라 배경색 설정 */


  &:hover {
    background-color: hsl(210,8%,85%);
  }

`;

export const SortBtn = styled.button`
  background-color: transparent;
  margin-left: -1px;
  padding: 0.5rem;
  width: auto;
  height: 35px;
  border: 1px solid rgb(159, 166, 173);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--black-800);
  &:hover {
    background-color: var(--black-025);
  }
  &:focus {
    background-color: var(--black-050);
  }
  &:active {
    background-color: var(--black-100);
    color: black;
    border-style: initial;
    outline: 6px solid var(--blue-100);
  }
`;
