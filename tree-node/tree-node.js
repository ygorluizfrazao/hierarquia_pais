export default class TreeNode {
  #root;
  getRoot = function () {
    return this.#root;
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
    return new TreeNode(undefined, undefined, label);
  }

  static createNodeWithLabelAndRoot(label, root) {
    return new TreeNode(root, undefined, label);
  }

  constructor(root, children, label) {
    this.#label = typeof label == "string" ? label : "";
    this.#children = typeof children != "undefined" ? children : new Array();
    this.setRoot(root);
  }

  setRoot(root) {
    this.#root = typeof root != "undefined" ? root : null;

    if (this.#root != null) {
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
      this.#children.push(childNode);
    } else {
      this.#children.unshift(childNode);
    }
  }
}
