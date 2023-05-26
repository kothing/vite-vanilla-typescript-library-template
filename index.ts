import MyLibrary from "./src";

const domRoot = document.getElementById("root") as HTMLElement;
const myLibraryInstance = new MyLibrary();

domRoot.innerHTML = `<p>Hello ${myLibraryInstance.myMethod()}</p>`;
