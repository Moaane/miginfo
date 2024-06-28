// components/Editor.js
import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["direction"],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    handlers: {
      image: function () {
        const range = this.quill.getSelection();
        const value = prompt("Enter image URL:");
        if (value) {
          this.quill.insertEmbed(range.index, "image", value, "user");
        }
      },
      //   "image-upload": function () {
      //     const input = document.createElement("input");
      //     input.setAttribute("type", "file");
      //     input.setAttribute("accept", "image/*");
      //     input.click();

      //     input.onchange = () => {
      //       const file = input.files[0];
      //       if (file) {
      //         const reader = new FileReader();
      //         reader.onload = (e) => {
      //           const range = this.quill.getSelection();
      //           this.quill.insertEmbed(
      //             range.index,
      //             "image",
      //             e.target.result,
      //             "user"
      //           );
      //         };
      //         reader.readAsDataURL(file);
      //       }
      //     };
      //   },
    },
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
];

const Editor = React.memo(({ value, onChange }) => {
  return (
    <div>
      <div className="max-w-[300px] lg:max-w-md xl:max-w-[600px] min-h-72">
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          className="h-full min-h-72"
          theme="snow"
        />
      </div>
    </div>
  );
});

export default Editor;
