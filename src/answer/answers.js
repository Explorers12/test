import AnswerUsers from "./answerUsers";
import Vote from "../component/vote";
import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;

  .headline {
  display: flex;
  justify-content: space-between; 
  }

  h1 {
  font-size: 30px;
  white-space: pre-line;
  }

  .row {
  display: flex;
  flex-direction: row;
  padding: 20px 20px 20px 0;
  gap: 60px;  
  }

  .answer-section {
  display: flex;
  flex-direction: row;
  align-items: center; 
  }

`;


function Answers() {
  return (
    <Content>
      <div>
        <div>
          <div className="headline">
            <h1>제목입니다.</h1>
          </div>
        </div>
      </div>
      <div className="row">
          <div>
            <div className="answer-section">
              <Vote />
              <p>답변글입니다.23324234324324234324324</p>
            </div>
            <AnswerUsers />
          </div>
      </div>
    </Content>
  );
}

export default Answers;
