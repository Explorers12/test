import React, { useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';

const AskFormAll = styled.div`
  display: flex;
  .ask-form {
    border: 1px solid hsl(210, 8%, 90%);
    border-radius: 5px;
    padding: 24px;
    display: flex;
    width: 65.5%;
    margin-bottom: 24px;
  }
  .ask-box {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .title-box {
    width: 50%;
  }
  .title {
    font-weight: 600;
    font-size: 15px;
    padding-top: 5px;
    cursor: pointer;
  }
  .notification {
    font-weight: normal;
    font-size: 13px;
  }
  label {
    display: flex;
  }
  input {
    width: 100%;
    margin-top: 16px;
    padding: 8px 9px;
    background-color: #fff;
    color: hsl(210, 8%, 5%);
    font-size: 13px;
    border: 1px solid hsl(210, 8%, 80%);
    border-radius: 3px;
    outline: none;

    &:focus {
      box-shadow: 0px 0px 0px 4px hsl(206, 96%, 90%);
      border-color: hsl(206, 85%, 57.5%);
    }
  }
`;

const QuestionsEditor = styled.div`
    border: 1px solid hsl(210,8%,90%) ;
    border-radius: 5px ;
    padding: 24px;
    display: flex;
    width: 65.5%;
    .ask-title {
        display: flex;
        flex-direction: column ;
    }
    .title {
        font-weight: 600;
        font-size: 15px;
        padding-top: 5px;
        cursor: pointer ;
    }
    .notification {
        font-weight: normal;
            font-size: 13px;
    }
    textarea {
        width: 100%;
        height: 200px;
        margin-top: 16px;
        padding: 8px 9px;
        background-color: #fff;
        color: hsl(210, 8%, 5%);
        font-size: 13px;
        border: 1px solid hsl(210,8%,80%);
        border-radius: 3px;
        outline: none;

  &:focus {
    box-shadow: 0px 0px 0px 4px hsl(206,96%,90%);
    border-color: hsl(206,85%,57.5%);;
  }
    }
  
    .post-button {
  background-color: rgb(10, 149, 255);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 5px;
  cursor: pointer;
  text-decoration: none;
  width: 125px;
  height: 40px;
  font-size: 13px;
  margin-top: 20px ;

  &:hover {
    background-color:hsl(206,100%,40%);
  }

  &:focus {
    box-shadow: 0px 0px 0px 4px hsl(206,96%,90%);
    border-color: hsl(206,85%,57.5%);
  }
}  
      `;

function QuestionAskForm() {
  const [title, setTitle] = useState(''); // 사용자가 입력한 제목을 상태로 관리
  const [body, setBody] = useState('');   // 본문을 상태로 관리

  const apiUrl = 'https://localhost:8080'; // API의 기본 URL

  const handlePostQuestion = () => {
    const questionData = {
      title: title,
      body: body
    };

    axios.post(apiUrl, questionData)
      .then(response => {
        alert('질문이 성공적으로 등록되었습니다:', response.data);
      })
      .catch(error => {
        alert('질문 등록 중 오류가 발생했습니다:', error);
      });
  };

  return (
    <div>
      <AskFormAll>
        <div className='ask-form'>
          <div className='ask-box'>
            <div className='title-box'>
              <label className='title' htmlFor='question-title'>
                Title
              </label>
              <label className='notification' htmlFor='question-title'>
                Be specific and imagine you’re asking a question to another person.
              </label>
            </div>
            <div>
              <input
                type='text'
                placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
                id='question-title'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
          </div>
        </div>
      </AskFormAll>

      <QuestionsEditor>
        <div>
          <div className="ask-title">
            <label className='title' htmlFor="question-body">
              What are the details of your problem?
            </label>
            <label className='notification' htmlFor="question-body">
              Introduce the problem and expand on what you put in the title.
              Minimum 20 characters.
            </label>
          </div>
          <div className="ask-form-body" id="question-body">
            <textarea value={body} onChange={e => setBody(e.target.value)} />
          </div>
          <button className="post-button" onClick={handlePostQuestion}>
            Post Your Question
          </button>
        </div>
      </QuestionsEditor>
    </div>
  );
}

export default QuestionAskForm;