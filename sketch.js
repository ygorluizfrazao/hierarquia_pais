let rootNode;
var hierarchyHost = document.getElementById("hierarchy-host");

class TreeNode {
  #root;
  getRoot = function () {
    return this.#root;
  };
  #x;
  getX = function () {
    return this.#x;
  };
  setX = function (x) {
    this.#x = x;
  };
  #y;
  getY = function () {
    return this.#y;
  };
  setY = function (y) {
    this.#y = y;
  };
  #w;
  getWidth = function () {
    return this.#w;
  };
  #h;
  getHeight = function () {
    return this.#h;
  };
  #children;
  getChildren = function () {
    return this.#children.map((node) => node);
  };
  #label;
  getLabel = function () {
    return this.#label;
  };

  static createNodeWithLabel(label) {
    return new TreeNode(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      label
    );
  }

  static createNodeWithLabelAndRoot(label, root) {
    return new TreeNode(
      root,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      label
    );
  }

  constructor(root, x, y, w, h, children, label) {
    this.#label = typeof label == "string" ? label : "";
    this.#x = typeof x == "number" ? x : hierarchyHost.offsetWidth / 2 - 50;
    this.#y = typeof y == "number" ? y : 50;
    this.#w = typeof w == "number" ? w : 100;
    this.#h = typeof h == "number" ? h : 50;
    this.#children = typeof children != "undefined" ? children : new Array();
    this.setRoot(root);
  }

  setRoot(root) {
    this.#root = typeof root != "undefined" ? root : null;

    if (this.#root != null) {
      this.#x = this.#root.getX();
      this.#y = this.#root.getY() + 2 * this.#root.getHeight();
      this.#root.#addChild(this);
    }
  }

  #addChild(childNode) {
    const childrenSize = this.#children.length;

    if (childrenSize <= 0) {
      this.#children.push(childNode);
      return;
    }

    if (this.#children.length % 2 == 0) {
      const lastNode = this.#children[childrenSize - 1];
      childNode.#x = lastNode.getX() + lastNode.getWidth() + 30;
      this.#children.push(childNode);
    } else {
      const firstNode = this.#children[0];
      childNode.#x = firstNode.getX() - 30 - childNode.getWidth();
      this.#children.unshift(childNode);
    }
  }
}

new ResizeObserver(() => {
  rootNode = TreeNode.createNodeWithLabel("PREFEITURA DE SÃO LUÍS");
  TreeNode.createNodeWithLabelAndRoot("SECRETARIA DE ADMINISTRACAO", rootNode);
  TreeNode.createNodeWithLabelAndRoot("PRAÇA GONÇALVES DIAS", rootNode);
  TreeNode.createNodeWithLabelAndRoot("TESTE", rootNode);
  TreeNode.createNodeWithLabelAndRoot("SECRETARIA DE ADMINISTRACAO", rootNode);
  const brotherNode = TreeNode.createNodeWithLabelAndRoot("PRAÇA GONÇALVES DIAS", rootNode);
  const nextNode = TreeNode.createNodeWithLabelAndRoot("TESTE", rootNode);
  const thirdNode = TreeNode.createNodeWithLabelAndRoot("TESTE2", nextNode);
  TreeNode.createNodeWithLabelAndRoot("TESTE5", nextNode);
  TreeNode.createNodeWithLabelAndRoot("TESTE6", nextNode);
  TreeNode.createNodeWithLabelAndRoot("TESTE7", brotherNode);
  TreeNode.createNodeWithLabelAndRoot("TESTE8", brotherNode);
  TreeNode.createNodeWithLabelAndRoot("TESTE3", thirdNode);
  TreeNode.createNodeWithLabelAndRoot("TESTE4", thirdNode);

  hierarchyHost.innerHTML = "";
  hierarchyHost.appendChild(
    createRow().appendChild(createTreeNodeGraphics(rootNode))
  );
  if (rootNode.getChildren().length > 0) {
    hierarchyHost.appendChild(createDivider());
    buildTree(hierarchyHost, rootNode);
  }
}).observe(hierarchyHost);

function buildTree(host, node) {
  const childHierarchyRow = createRow();

  childHierarchyRow.appendChild(createVerticalDivider());
  node.getChildren().forEach((chl) => {
    childHierarchyRow.appendChild(
      createRow().appendChild(createTreeNodeGraphics(chl))
    );
  });
  childHierarchyRow.appendChild(createVerticalDivider());

  if (node.getChildren().length > 0) {
    host.appendChild(childHierarchyRow);
    host.appendChild(createDivider());
  }

  node.getChildren().forEach((chl) => {
    buildTree(host, chl);
  });
}

function createRow() {
  const row = document.createElement("div");
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

  if (node.getRoot() != null) {
    const rootnodeContent = document.createElement("span");
    rootnodeContent.innerHTML = node.getRoot().getLabel();
    rootnodeContent.style.fontSize = "6px";
    rootnodeContent.style.fontWeight = "bolder";
    treenode.appendChild(rootnodeContent);
  }
  const treenodeContent = document.createElement("span");
  treenodeContent.innerHTML = node.getLabel();
  treenode.appendChild(treenodeContent);
  return treenode;
}
