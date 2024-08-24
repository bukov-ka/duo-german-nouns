export interface Noun {
  word: string;
  gender: "n" | "m" | "f";
  plural: string;
  translation: string;
}

export async function loadNouns(): Promise<Noun[]> {
  const basePath =
    process.env.NODE_ENV === "production" ? "/duo-german-nouns" : "";
  const response = await fetch(`${basePath}/german_nouns.json`);
  const data: [string, string, string, string][] = await response.json();
  return data
    .map(([word, gender, plural, translation]) => ({
      word,
      gender: gender as "n" | "m" | "f",
      plural,
      translation,
    }))
    .filter((noun) => ["n", "m", "f"].includes(noun.gender));
}
