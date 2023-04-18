class TreeNode {
  #root;
  getRoot = function () {
    return this.#root;
  };
  #x;
  getX = function () {
    return this.#x;
  };
  #y;
  getY = function () {
    return this.#y;
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
    this.#x = typeof x == "number" ? x : width / 2 - 50;
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
      this.#root.#addChild(this)
    }
  }

  #addChild(childNode) {
    this.#children.push(childNode);
  }
}

let rootNode;

function setup() {
  createCanvas(
    window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
  );

  rootNode = TreeNode.createNodeWithLabel("PREFEITURA DE SÃO LUÍS");
  console.log(rootNode);
  TreeNode.createNodeWithLabelAndRoot("SECRETARIA DE ADMINISTRACAO", rootNode);
  console.log(rootNode.getChildren());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  rootNode.x = width / 2 - 50;
}

function draw() {
  clear();
  background(0);
  textAlign(CENTER, CENTER);
  rect(rootNode.getX(), rootNode.getY(), rootNode.getWidth(), rootNode.getHeight());
  text(rootNode.getLabel(), rootNode.getX(), rootNode.getY(), rootNode.getWidth(), rootNode.getHeight());
  let children = rootNode.getChildren();
  for (node of children) {
    rect(node.getX(), node.getY(), node.getWidth(), node.getHeight());
    text(node.getLabel(), node.getX(), node.getY(), node.getWidth(), node.getHeight());
  }
}
