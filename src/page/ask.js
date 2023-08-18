import { styled } from "styled-components";
import QuestionAsk from "../question/questionAsk";
import QuestionAskForm from "../question/questionAskform";

const AskContainer =styled.div`
    padding: 0 150px 50px 150px;
`

function Ask() {
    return(
        <AskContainer>
            <QuestionAsk />
            <QuestionAskForm />
        </AskContainer>
    )
}

export default Ask;