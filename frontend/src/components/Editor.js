import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CustomEditor = ({ label, editorState, setEditorState }) => {
  return (
    <>
      <label className="leading-7 text-sm text-gray-600">{label}</label>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={setEditorState}
      />
    </>
  );
};

export default CustomEditor;
