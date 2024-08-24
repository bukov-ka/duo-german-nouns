import { Noun, loadNouns } from "./data";

export class App {
  private nouns: Noun[] = [];
  private currentNoun: Noun | null = null;

  constructor(
    private wordElement: HTMLElement,
    private pluralElement: HTMLElement,
    private translationElement: HTMLElement,
    private derButton: HTMLButtonElement,
    private dieButton: HTMLButtonElement,
    private dasButton: HTMLButtonElement,
    private feedbackElement: HTMLElement,
    private continueButton: HTMLButtonElement
  ) {
    this.initialize();
  }

  private async initialize() {
    this.nouns = await loadNouns();
    this.setupEventListeners();
    this.nextWord();
  }

  private setupEventListeners() {
    this.derButton.addEventListener("click", () => this.checkAnswer("m"));
    this.dieButton.addEventListener("click", () => this.checkAnswer("f"));
    this.dasButton.addEventListener("click", () => this.checkAnswer("n"));
    this.continueButton.addEventListener("click", () => this.nextWord());
  }

  private nextWord() {
    this.currentNoun =
      this.nouns[Math.floor(Math.random() * this.nouns.length)];
    this.wordElement.textContent = this.currentNoun.word;
    this.pluralElement.textContent = `Plural: ${this.currentNoun.plural}`;
    this.translationElement.textContent = `Translation: ${this.currentNoun.translation}`;
    this.feedbackElement.textContent = "";
    this.continueButton.style.display = "none";
    this.resetButtons();
  }

  private checkAnswer(answer: "n" | "m" | "f") {
    if (!this.currentNoun) return;

    const correct = answer === this.currentNoun.gender;
    const button = this.getButtonForGender(answer);
    const correctButton = this.getButtonForGender(this.currentNoun.gender);

    button.style.backgroundColor = correct ? "green" : "red";
    correctButton.style.backgroundColor = "green";

    this.feedbackElement.textContent = correct
      ? "Correct!"
      : "Incorrect. Try again!";
    this.continueButton.style.display = "inline-block";
  }

  private getButtonForGender(gender: "n" | "m" | "f"): HTMLButtonElement {
    switch (gender) {
      case "m":
        return this.derButton;
      case "f":
        return this.dieButton;
      case "n":
        return this.dasButton;
    }
  }

  private resetButtons() {
    [this.derButton, this.dieButton, this.dasButton].forEach((button) => {
      button.style.backgroundColor = "";
    });
  }
}
