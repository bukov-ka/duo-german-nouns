import { Noun, loadNouns } from "./data";

export class App {
  private nouns: Noun[] = [];
  private currentNoun: Noun | null = null;

  private mistakes: Map<string, { noun: Noun; correctAttempts: number }> =
    new Map();
  private showingMistakes: boolean = false;

  constructor(
    private wordElement: HTMLElement,
    private pluralElement: HTMLElement,
    private translationElement: HTMLElement,
    private derButton: HTMLButtonElement,
    private dieButton: HTMLButtonElement,
    private dasButton: HTMLButtonElement,
    private feedbackElement: HTMLElement,
    private continueButton: HTMLButtonElement,
    private mistakesCheckbox: HTMLInputElement
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
    this.mistakesCheckbox.addEventListener("change", () => this.toggleMistakes()); 
  }

  private toggleMistakes() {
    this.showingMistakes = this.mistakesCheckbox.checked;
    this.nextWord();
  }

  private nextWord() {
    const wordList = this.showingMistakes
      ? Array.from(this.mistakes.values()).map((entry) => entry.noun)
      : this.nouns;
  
    if (wordList.length === 0) {
      this.wordElement.textContent = "No mistakes left";
      this.pluralElement.textContent = "";
      this.translationElement.textContent = "";
      this.feedbackElement.textContent = "";
      this.continueButton.style.visibility = "hidden";
      this.hideGenderButtons();
      return;
    }

    this.showGenderButtons(); 
  
    this.currentNoun = wordList[Math.floor(Math.random() * wordList.length)];
    this.wordElement.textContent = this.currentNoun.word;
    this.pluralElement.textContent = `Plural: ${this.currentNoun.plural}`;
    this.translationElement.textContent = `Translation: ${this.currentNoun.translation.toLowerCase()}`;
    this.feedbackElement.textContent = "";
    this.continueButton.style.visibility = "hidden";
    this.resetButtons();
  }

  private hideGenderButtons() {
    [this.derButton, this.dieButton, this.dasButton].forEach((button) => {
      button.style.display = "none"; // Hide buttons
    });
  }
  
  private showGenderButtons() {
    [this.derButton, this.dieButton, this.dasButton].forEach((button) => {
      button.style.display = "inline-block"; // Show buttons
    });
  }

  private checkAnswer(answer: "n" | "m" | "f") {
    if (!this.currentNoun) return;
  
    const correct = answer === this.currentNoun.gender;
    const selectedButton = this.getButtonForGender(answer);
    const correctButton = this.getButtonForGender(this.currentNoun.gender);
  
    this.resetButtons();
    correctButton.style.backgroundColor = "#4CAF50";
  
    if (correct) {
      this.feedbackElement.textContent = "Correct!";
      if (this.mistakes.has(this.currentNoun.word)) {
        const mistake = this.mistakes.get(this.currentNoun.word)!;
        mistake.correctAttempts++;
        if (mistake.correctAttempts >= 2) {
          this.mistakes.delete(this.currentNoun.word);
        }
      }
    } else {
      selectedButton.style.backgroundColor = "#f44336";
      this.feedbackElement.textContent = "Incorrect. Try again!";
      if (!this.mistakes.has(this.currentNoun.word)) {
        this.mistakes.set(this.currentNoun.word, {
          noun: this.currentNoun,
          correctAttempts: 0,
        });
      }
    }
  
    this.continueButton.style.visibility = "visible";
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
      button.style.backgroundColor = "#9e9e9e"; // Reset to gray
    });
  }
}
