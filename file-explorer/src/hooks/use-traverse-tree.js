const useTraverseTree = () => {
  function insertNode(tree, folderId, newItem, isFolder) {
    if (tree.id === folderId) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: newItem,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latestItems;
    latestItems = tree.items.map((obj) => {
      return insertNode(obj, folderId, newItem, isFolder);
    });
    return { ...tree, items: latestItems };
  }

  const deleteNode = (tree, folderId) => {
    if (tree.id === folderId) {
      return null;
    }
    let newItem;
    if (tree.items) {
      newItem = tree.items
        .map((item) => deleteNode(item, folderId))
        .filter((item) => item !== null); // Filter out the null values (i.e., deleted nodes)
    }

    return { ...tree, newItem };
  };

  const editNode = (tree, folderId, newName) => {
    if (tree.id === folderId) {
      tree.name = newName;

      return tree;
    }

    let latestItems = tree.items.map((obj) => {
      return editNode(obj, folderId, newName);
    });
    return { ...tree, items: latestItems };
  };

  return { insertNode, deleteNode, editNode };
};

export default useTraverseTree;
