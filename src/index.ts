import { App } from "./app";

document.addEventListener("DOMContentLoaded", () => {
  const app = new App(
    document.getElementById("word")!,
    document.getElementById("der") as HTMLButtonElement,
    document.getElementById("die") as HTMLButtonElement,
    document.getElementById("das") as HTMLButtonElement,
    document.getElementById("feedback")!,
    document.getElementById("continue") as HTMLButtonElement
  );
});
