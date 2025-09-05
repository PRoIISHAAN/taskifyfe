import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import MarkdownShortcuts from "quill-markdown-shortcuts";

ReactQuill.Quill.register("modules/markdownShortcuts", MarkdownShortcuts);

export default function TrelloStyleDescription({ initialValue = "" }) {
  const [value, setValue] = useState(initialValue);
  const [draft, setDraft] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(true);
  const customDropdownRef = useRef(null);
  const quillRef = useRef(null);

  function ToolBar() {
    return (
      <div className="toolbar" id="toolbar">
        <select className="ql-header" defaultValue={""}>
          <option selected />
          <option value="1" />
          <option value="2" />
          <option value="3" />
          <option value="4" />
          <option value="5" />
          <option value="6" />
        </select>
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button ref={customDropdownRef} className="custom dropdown"></button>
        <div className="border-r-1"></div>
        <button className="list-dropdown"></button>
        <div className="border-r-1"></div>
        <button className="ql-link"></button>
        <button className="ql-image"></button>
        <button className="ql-mention"></button>
        <button className="ql-emoji"></button>
        <button className="ql-code"></button>
        <button className="ql-quote"></button>
      </div>
    );
  }

  const hasChanges =
    draft.trim().replace(/<p><br><\/p>/g, "") !==
    value.trim().replace(/<p><br><\/p>/g, "");

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
    markdownShortcuts: {},
  };

  useEffect(() => {
    if (isEditing && quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    const cleaned = draft.trim().replace(/<p><br><\/p>/g, "");
    setValue(cleaned);
    setDraft(cleaned);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  return (
    <div className="w-full">
      {!isEditing ? (
        <div
          onClick={() => setIsEditing(true)}
          className="cursor-pointer p-2 rounded hover:bg-gray-100 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{
            __html:
              value.trim().replace(/<p><br><\/p>/g, "") ||
              `<span class="text-gray-500">Add a description…</span>`,
          }}
        />
      ) : (
        <div className="flex flex-col gap-2">
          <ToolBar></ToolBar>
          <ReactQuill
            ref={quillRef}
            value={draft}
            onChange={setDraft}
            modules={modules}
            theme="snow"
            placeholder="Add a description…"
            className="trello-quill"
          />
          {hasChanges && (
            <div className="flex gap-2 mt-1">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
