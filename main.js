import FileChooser from "./file-chooser/file-chooser.js";
import TreeNode from "./tree-node/tree-node.js";

let rootNode;
let hierarchyHost = document.getElementById("hierarchy-host");
let fileChooser = new FileChooser('file-chooser-1')



rootNode = TreeNode.createNodeWithLabel("PREFEITURA DE SÃO LUÍS");
const sisterNode = TreeNode.createNodeWithLabelAndRoot(
  "SECRETARIA DE ADMINISTRACAO",
  rootNode
);
TreeNode.createNodeWithLabelAndRoot("PRAÇA GONÇALVES DIAS", rootNode);
TreeNode.createNodeWithLabelAndRoot("TESTE", rootNode);
TreeNode.createNodeWithLabelAndRoot("SECRETARIA DE ADMINISTRACAO", rootNode);
const brotherNode = TreeNode.createNodeWithLabelAndRoot(
  "PRAÇA GON DIAS",
  rootNode
);
const nextNode = TreeNode.createNodeWithLabelAndRoot("TESTE", rootNode);
const thirdNode = TreeNode.createNodeWithLabelAndRoot("TESTE2", nextNode);
TreeNode.createNodeWithLabelAndRoot("TESTE5", nextNode);
TreeNode.createNodeWithLabelAndRoot("TESTE6", nextNode);
TreeNode.createNodeWithLabelAndRoot("TESTE7", brotherNode);
TreeNode.createNodeWithLabelAndRoot("TESTE8", brotherNode);
TreeNode.createNodeWithLabelAndRoot("TESTE3", thirdNode);
TreeNode.createNodeWithLabelAndRoot("TESTE4", thirdNode);

TreeNode.createNodeWithLabelAndRoot("TESTE9", sisterNode);
TreeNode.createNodeWithLabelAndRoot("TESTE10", sisterNode);

hierarchyHost.innerHTML = "";
hierarchyHost.appendChild(
  createRow(0).appendChild(createTreeNodeGraphics(rootNode))
);
if (rootNode.getChildren().length > 0) {
  hierarchyHost.appendChild(createDivider());
  buildTree(hierarchyHost, rootNode, 1);
}


function buildTree(host, node, level) {
  const existingRow = document.getElementById("row" + level);
  let rowExist = false;
  let childHierarchyRow;
  if (typeof existingRow != "undefined" && existingRow != null) {
    childHierarchyRow = existingRow;
    rowExist = true;
  } else {
    childHierarchyRow = createRow(level);
  }

  if (node.getChildren().length > 0) {
    if (rowExist) childHierarchyRow.appendChild(createVerticalDivider());
    node.getChildren().forEach((chl) => {
      childHierarchyRow.appendChild(createTreeNodeGraphics(chl));
    });

    if (!rowExist) {
      host.appendChild(childHierarchyRow);
      host.appendChild(createDivider());
    }
  }

  node.getChildren().forEach((chl) => {
    buildTree(host, chl, level + 1);
  });
}

function createRow(level) {
  const row = document.createElement("div");
  row.id = "row" + level;
  row.classList.add("hierarchy-row");
  return row;
}

function createDivider() {
  const divider = document.createElement("div");
  divider.classList.add("flex-divider");
  divider.appendChild(document.createElement("hr"));
  return divider;
}

function createVerticalDivider() {
  const divider = document.createElement("div");
  divider.classList.add("flex-divider-vertical");
  return divider;
}

function createTreeNodeGraphics(node) {
  const treenode = document.createElement("div");
  treenode.classList.add("hierarchy-card");
  treenode.classList.add("card");

  const rootNodeContent = document.createElement("div");
  rootNodeContent.classList.add("hierarchy-card-title");
  const rootNodeSpan = document.createElement("span");
  if (node.getRoot() != null)
    rootNodeSpan.innerHTML = node.getRoot().getLabel();
  else {
    rootNodeSpan.innerHTML = "PATRICARCA";
    rootNodeContent.style.background = "var(--color-secondary)";
  }
  rootNodeContent.appendChild(rootNodeSpan);
  treenode.appendChild(rootNodeContent);
  const treenodeContent = document.createElement("span");
  treenodeContent.innerHTML = node.getLabel();
  treenode.appendChild(treenodeContent);
  return treenode;
}
