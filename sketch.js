class Node {
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

let table;
let father;

function setup() {
  createCanvas(
    window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
  );

  father = new Node({ label: "PREFEITURA DE SAO LUIS" });
  father.addChild(new Node({ label: "SECRETARIA DE ADMINISTRACAO" }));
  console.log(father.children);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  father.x = width / 2 - 50;
}

function draw() {
  background(100);
  textAlign(CENTER, CENTER);
  rect(father.x, father.y, father.w, father.h);
  text(father.label, father.x, father.y, father.w, father.h);
}

function calculaArea(base, altura) {
  return base * altura;
}
