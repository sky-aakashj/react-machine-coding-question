import React, { useRef, useState } from "react";

const Folder = ({
  explorer,
  handleAddNode,
  handleEditNode,
  handleDeleteNode,
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [showEditInput, setShowEditInput] = useState(false);

  const handleClick = () => {
    setExpand(!expand);
  };

  const handleAddFolder = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({ visible: true, isFolder: isFolder });
    setExpand(true);
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    handleDeleteNode(explorer.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowEditInput(true);
  };
  const onEditFolder = (e) => {
    e.stopPropagation();
    if (e.keyCode === 13 && e.target.value !== explorer.name) {
      handleEditNode(explorer.id, e.target.value);
      setShowEditInput(false);
    }
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleAddNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  return (
    <>
      {Object.keys(explorer).length ? (
        <>
          {explorer.isFolder ? (
            <div style={{ marginTop: 5 }} key={explorer.id}>
              <div className="folder" onClick={handleClick}>
                {showEditInput ? (
                  <span>
                    📁
                    <input
                      type="text"
                      defaultValue={explorer.name}
                      onBlur={() => setShowEditInput(false)}
                      autoFocus
                      onKeyDown={(e) => {
                        onEditFolder(e);
                      }}
                    />
                  </span>
                ) : (
                  <span>📁{explorer.name}</span>
                )}

                <div>
                  <button
                    onClick={(e) => {
                      handleEdit(e);
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleAddFolder(e, true);
                    }}
                  >
                    folder+
                  </button>
                  <button
                    onClick={(e) => {
                      handleAddFolder(e, false);
                    }}
                  >
                    file+
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
              <div
                style={{ display: expand ? "block" : "none", paddingLeft: 10 }}
              >
                {showInput.visible && (
                  <div className="inputContainer">
                    <span>{showInput.isFolder ? "📁" : "📃"}</span>
                    <input
                      type="text"
                      className="input"
                      onKeyDown={(e) => onAddFolder(e)}
                      onBlur={() =>
                        setShowInput({ ...showInput, visible: false })
                      }
                      autoFocus
                    />
                  </div>
                )}
                {explorer.items.map((exp) => (
                  <Folder
                    key={exp.id}
                    handleAddNode={handleAddNode}
                    explorer={exp}
                    handleEditNode={handleEditNode}
                    handleDeleteNode={handleDeleteNode}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="file" key={explorer.id}>
              {showEditInput ? (
                <span>
                  📄
                  <input
                    type="text"
                    defaultValue={explorer.name}
                    onBlur={() => setShowEditInput(false)}
                    autoFocus
                    onKeyDown={(e) => {
                      onEditFolder(e);
                    }}
                  />
                </span>
              ) : (
                <span>📄{explorer.name}</span>
              )}
              <div>
                <button
                  onClick={(e) => {
                    handleEdit(e);
                  }}
                >
                  edit
                </button>
                <button
                  onClick={(e) => {
                    handleDelete(e);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

export default Folder;
