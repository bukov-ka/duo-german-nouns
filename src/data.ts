export interface Noun {
  word: string;
  gender: "n" | "m" | "f";
  plural: string;
}

export async function loadNouns(): Promise<Noun[]> {
  const response = await fetch("/german_nouns_with_gender_and_plural.json");
  const data: [string, string, string][] = await response.json();
  return data
    .map(([word, gender, plural]) => ({
      word,
      gender: gender as "n" | "m" | "f",
      plural,
    }))
    .filter((noun) => ["n", "m", "f"].includes(noun.gender));
}
