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
    console.log(hierarchyHost.offsetWidth / 2 - 50);
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
  TreeNode.createNodeWithLabelAndRoot("PRAÇA GONÇALVES DIAS", rootNode);
  TreeNode.createNodeWithLabelAndRoot("TESTE", rootNode);
  hierarchyHost.innerHTML = "";

  createTreeNodeGraphics(hierarchyHost, rootNode);

  rootNode.getChildren().forEach((chl) => {
    createTreeNodeGraphics(hierarchyHost, chl);
  });
}).observe(hierarchyHost);

function createTreeNodeGraphics(host, node) {
  let treenode = document.createElement("div");
  treenode.classList.add("hierarchy-card");
  treenode.classList.add("card");
  // treenode.style.left = host.offsetLeft+node.getX() + "px";
  // treenode.style.top = host.offsetTop+node.getY() + "px";
  treenode.style.left = node.getX() + "px";
  treenode.style.top = node.getY() + "px";
  let treenodeContent = document.createElement("span");
  treenodeContent.innerHTML = node.getLabel();
  treenode.appendChild(treenodeContent);
  host.appendChild(treenode);
}
