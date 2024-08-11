import { useState } from "react";
import "./App.css";
import explorer from "./folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, editNode, deleteNode } = useTraverseTree();

  const handleAddNode = (folderId, newItem, isFolder) => {
    const newExplorer = insertNode(explorerData, folderId, newItem, isFolder);
    setExplorerData(newExplorer);
  };

  const handleEditNode = (folderId, newName) => {
    const newExplorer = editNode(explorerData, folderId, newName);
    setExplorerData(newExplorer);
  };
  const handleDeleteNode = (folderId) => {
    const newExplorer = deleteNode(explorerData, folderId);
    setExplorerData(newExplorer);
  };

  return (
    <>
      <h1>{"file explorer"}</h1>
      <Folder
        explorer={explorerData || {}}
        handleAddNode={handleAddNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
      />
    </>
  );
}

export default App;
