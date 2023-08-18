import React from "react";
import Sidebar from "../component/Sidebar";
import Aside from "../component/aside";
import QuestionList from "../question/questionlist";
import { styled } from "styled-components";

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 120px;
`;

const SidebarContainer = styled.div`
    flex: 15;
`;

const QuestionListContainer = styled.div`
    flex: 55;
`;

const AsideContainer = styled.div`
    flex: 30;
`;

function Main() {
    return (
        <MainContainer>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <QuestionListContainer>
                <QuestionList />
            </QuestionListContainer>
            <AsideContainer>
                <Aside />
            </AsideContainer>
        </MainContainer>
    );
}

export default Main;
