import "./style.css";

export default class MyLibrary {
  name: string;
  constructor() {
    this.name = "MyLibrary";
    console.log("Library constructor loaded");
  }

  myMethod = () => {
    console.log("Library method fired");
    return this.name;
  };
}
