import { Noun, loadNouns } from "./data";

interface MistakeEntry {
  noun: Noun;
  correctAttempts: number;
}

export class App {
  private nouns: Noun[] = [];
  private currentNoun: Noun | null = null;

  private mistakes: Map<string, MistakeEntry> = new Map();
  private showingMistakes: boolean = false;
  private showingArticle: boolean = false;

  constructor(
    private wordElement: HTMLElement,
    private pluralElement: HTMLElement,
    private translationElement: HTMLElement,
    private derButton: HTMLButtonElement,
    private dieButton: HTMLButtonElement,
    private dasButton: HTMLButtonElement,
    private feedbackElement: HTMLElement,
    private continueButton: HTMLButtonElement,
    private mistakesCheckbox: HTMLInputElement,
    private showArticleCheckbox: HTMLInputElement 
  ) {
    this.initialize();
  }

  private async initialize() {
    this.loadMistakes(); // Load mistakes from localStorage
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
    this.showArticleCheckbox.addEventListener("change", () => this.toggleArticle());
  }

  private toggleMistakes() {
    this.showingMistakes = this.mistakesCheckbox.checked;
    this.nextWord();
  }

  private toggleArticle() {
    this.showingArticle = this.showArticleCheckbox.checked;
    if (this.currentNoun) {
      this.displayWord(this.currentNoun);
    }
  }

  
  private getArticleForGender(gender: "n" | "m" | "f"): string {
    switch (gender) {
      case "m":
        return "der";
      case "f":
        return "die";
      case "n":
        return "das";
    }
  }

  private displayWord(noun: Noun) {
    if (this.showingArticle) {
      this.wordElement.innerHTML = `<small>${this.getArticleForGender(noun.gender)}</small> ${noun.word}`;
    } else {
      this.wordElement.textContent = noun.word;
    }
    this.pluralElement.textContent = `Plural: ${noun.plural}`;
    this.translationElement.textContent = `Translation: ${noun.translation.toLowerCase()}`;
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
    this.displayWord(this.currentNoun);
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
          this.saveMistakes(); // Save after deletion
        } else {
          this.mistakes.set(this.currentNoun.word, mistake);
          this.saveMistakes(); // Save after update
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
        this.saveMistakes(); // Save after adding a new mistake
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

  // New method to load mistakes from localStorage
  private loadMistakes() {
    const storedMistakes = localStorage.getItem("mistakes");
    if (storedMistakes) {
      try {
        const parsed: [string, MistakeEntry][] = JSON.parse(storedMistakes);
        this.mistakes = new Map(parsed);
      } catch (error) {
        console.error("Failed to parse mistakes from localStorage:", error);
        this.mistakes = new Map();
      }
    }
  }

  // New method to save mistakes to localStorage
  private saveMistakes() {
    const serialized = JSON.stringify(Array.from(this.mistakes.entries()));
    localStorage.setItem("mistakes", serialized);
  }
}
