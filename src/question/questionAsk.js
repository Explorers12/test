import styled from 'styled-components';
import questionCreateBg from '../images/questionCreateBg.svg'

const QuestionAskPage = styled.section`

.question-ask-title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 130px;
    background: url(${questionCreateBg}) right bottom no-repeat;
    h2 {
      font-size: 27px;
      font-weight:800;
    }
  }

  .question-ask-description-box {
        width: 100%;
        margin-top: 16px;
        display: flex;

        div {
          margin-bottom: 24px;
          padding: 24px;
          border-radius: 8px;
          background: #ebf4fb;
          border: 1px solid powderblue;
            }
        h3 {
            font-weight:400;
            font-size: 21px;
            margin: 0 0 8px;
            line-height: 1.3;
            }
        p {
            margin-bottom: 10px;
            }
        h4 {
            font-size: 13px;
            margin-bottom: 8px;
            }
        ul {
              margin-left: 15px;
            }
        li {
                font-size: 13px;
                line-height: 1.3;
                list-style-type: disc;
                list-style-position: inside;
            }

      }
`;

function QuestionAsk() {
    return(
        <QuestionAskPage>
            <div className="question-ask-title">
                <h2>Ask a public question</h2>
            </div>
            <div className="question-ask-description-box">
              <div>
                <h3>Writing a good question</h3>
                <p>
                  You’re ready to ask a programming-related question and this
                  form will help guide you through the process. <br />
                  Looking to ask a non-programming question? See the topics here
                  to find a relevant site.
                </p>
                <h4>Steps</h4>
                <p>
                  <ul>
                    <li>Summarize your problem in a one-line title.</li>
                    <li>Describe your problem in more detail.</li>
                    <li>
                      Describe what you tried and what you expected to happen.
                    </li>
                    <li>
                      Add “tags” which help surface your question to members of
                      the community.
                    </li>
                    <li>Review your question and post it to the site.</li>
                  </ul>
                </p>
              </div>
            </div>
        </QuestionAskPage>
        
    )
}

export default QuestionAsk;
