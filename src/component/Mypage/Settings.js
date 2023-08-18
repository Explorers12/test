import styled from "styled-components";
import Myeditor from "../TextEditor/TextEditor";
import { useState } from "react";

const Section = styled.section`
  display: flex;
  margin: 1.25rem 0;
`

const Cate = styled.article`
  display: flex;
  flex-direction: column;
  gap: .9375rem;

  .edit-btn,
  .delete-btn{
    width: 7.5rem;
    padding: .3125rem .625rem;
    border-radius: 15px;
    text-align: left;
  }
  .edit-btn.active,
  .delete-btn.active{
    background-color: #f1f2f3;
  }
`

const Settings = () => {
  const [addClass, setAddClass] = useState(true);
  
  return(
    <Section>
      <Cate>
        <button onClick={() => setAddClass(true)} className={addClass ? "edit-btn active" : "edit-btn"}>Edit Profile</button>
        <button onClick={() => setAddClass(false)} className={addClass ? "delete-btn" : "delete-btn active"}>Delete Profile</button>
        <>
          {addClass ? <Myeditor /> : <></>}
        </>
      </Cate>
    </Section>
  )
}

export default Settings;