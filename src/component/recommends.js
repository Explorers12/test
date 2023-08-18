import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Pencil } from '../images/pencil.svg';

const RecommendBox = styled.div`
  width: 100%;
  margin: 8px;
  border: 1px solid hsl(210,8%,90%);
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);

 .title {
    padding: 12px;
    background-color: hsl(210,8%,97.5%);
    font-size: 15px;
    border-bottom: 1px solid hsl(210,8%,85%);
  }

  .body {
    display: flex;
    margin: 16px;
p {
        font-size: 12px;
        margin-bottom: 12px;
      }
    }
  
`;


function RecommendTitle() {
  return (
    <RecommendBox>
      <div className='title'>Writing a good title</div>
      <div className='body'>
        <div>
          <Pencil />
        </div>
        <div>
          <p>Your title should summarize the problem.</p>
          <p>
            You might find that you have a better idea of your title after
            writing out the rest of the question.
          </p>
        </div>
      </div>
    </RecommendBox>
  );
}


function RecommendBody() {
  return (
    <RecommendBox>
      <div className='title'>Introduce the problem</div>
      <div className='body'>
        <div>
          <Pencil />
        </div>
        <div>
          <p>
            Explain how you encountered the problem you’re trying to solve, and
            any difficulties that have prevented you from solving it yourself.
          </p>
        </div>
      </div>
    </RecommendBox>
  );
}

export { RecommendTitle, RecommendBody };
