import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .change-value-button {
    background-color: white;
    font-size: 22px;
    border: solid 1px hsl(210,8%,75%);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    margin: 1rem;

    &:hover {
      background-color: hsl(27,95%,90%);
      transition: background-color 0.6s ease;
    }

    &:active {
      background-color: white ;
      color: hsl(27, 90%, 55%);
      border: hsl(27, 90%, 55%) solid 1px;
    }
  }
`;

function Vote() {
  const [count, setCount] = useState(0);
  const [buttonState, setButtonState] = useState('');

  const increment = () => {
    const updatedCount = count + 1;

    if (updatedCount === count + 1) { // 값이 올바르게 증가하면
      setCount(updatedCount);
      sendToServer('/questions/{question-id}/votes-up', updatedCount);
    } else {
      console.error('유효하지 않은 투표입니다.'); // 값이 증가하지 않으면 오류 발생
    }
  };

  const decrement = () => {
    const updatedCount = count - 1;

    if (updatedCount === count - 1) { // 값이 올바르게 감소하면
      setCount(updatedCount);
      sendToServer('/questions/{question-id}/votes-down', updatedCount);
    } else {
      console.error('유효하지 않은 투표입니다.'); // 값이 감소하지 않으면 오류 발생
    }
  };

  const sendToServer = (url, updatedCount) => {
    axios.patch(url, { count: updatedCount })
      .then(response => {
        console.log('서버 응답:', response.data);
      })
      .catch(error => {
        console.error('서버 요청 오류:', error);
      });
  };

  return (
    <ButtonContainer>
      <button 
        className={`change-value-button ${buttonState}`}
        onClick={increment}
        onMouseDown={() => setButtonState('mousedown')}
        onMouseUp={() => setButtonState('mouseup')}
      >
        ▲
      </button>
      <div className='count'>{count}</div>
      <button 
        className={`change-value-button ${buttonState}`}
        onClick={decrement}
        onMouseDown={() => setButtonState('mousedown')}
        onMouseUp={() => setButtonState('mouseup')}
      >
        ▼
      </button>
    </ButtonContainer>
  );
}

export default Vote;
