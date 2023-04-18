export default class TreeNode {
  constructor(options) {
    const defaultOpts = {
      father: null,
      x: width / 2 - 50,
      y: 50,
      w: 100,
      h: 50,
      children: new Array(0),
      label: "",
    };

    let opts = Object.assign({}, defaultOpts, options);
    this.father = opts.father;
    this.label = opts.label;
    this.x = opts.x;
    this.y = opts.y;
    this.w = opts.w;
    this.h = opts.h;
    this.children = opts.children;

    if (this.father != null) {
      this.x = father.x;
      this.y = father.y + 2 * father.h;
    }
  }

  addChild(childNode) {
    childNode.father = this;
    this.children.push(childNode);
  }
}
