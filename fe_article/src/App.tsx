import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
const App = () => {
  const { quill, quillRef } = useQuill();

  const [state, setState] = useState("");
  const [content, setContent] = useState("");
  let toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["link", "image", "video"],
    [{ size: ["small", false, "large", "huge"] }],

    // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setContent(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div>
      App the
      <div>
        <div>
          <ReactQuill
            modules={module}
            theme="snow"
            value={state}
            onChange={setState}
            className=""
            style={{
              height: "30vh",
            }}
          />
        </div>
      </div>
      {/* <div>Second try</div> */}
      {/* <div ref={quillRef} /> */}
      <p>{state}</p>
      <p className="mt-48" dangerouslySetInnerHTML={{ __html: state }} />
    </div>
  );
};

export default App;
