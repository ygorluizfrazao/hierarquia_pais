export default class FileChooser {
  #root;
  #fileInputButton;
  #label;
  #searchButton;
  #textfield;

  constructor(id) {
    let root = document.getElementById(id);
    if (typeof root == "undefined" || root == null)
      throw new Error("Id not found");
    if (root.tagName != "DIV")
      throw new Error("Invalid tag type, must be a div");
    if (!root.classList.contains("file-chooser"))
      throw new Error("Not a file-chooser class component");

    this.#root = root;
    this.#fileInputButton = this.#root.getElementsByClassName(
      "file-chooser-file-input"
    )[0];
    this.#label = this.#root.getElementsByTagName("label")[0];
    this.#searchButton = this.#root.getElementsByClassName(
      "file-chooser-search-btn"
    )[0];
    this.#textfield = this.#root.getElementsByClassName(
      "file-chooser-textfield"
    )[0];

    this.#searchButton.onclick = (e) => {
      this.#fileInputButton.click();
    };
    this.#textfield.onclick = (e) => {
      this.#fileInputButton.click();
    };
    this.#fileInputButton.onchange = (e) => {
      this.#textfield.value = e.target.files[0].name;
    };
  }

  setLabelText = function(labelText) {
    this.#label.innerText = labelText;
  }
}
