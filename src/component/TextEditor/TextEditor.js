import React from "react";
import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import koKR from "@toast-ui/editor/dist/i18n/ko-kr";

function Myeditor() {
  const editorRef = useRef();

  const handleRegisterBtn = () => {
    const data = editorRef.current.getInstance().getHTML();
    console.log(data);
  };
  return (
    <div className="editor_wrap">
      <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        language={koKR}
      />
      <button onClick={handleRegisterBtn}>등록</button>
    </div>
  );
}

export default Myeditor;
