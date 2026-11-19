export const MAX_SKILL_RATING = 5;

export const ENGLISH_SKILLS = [
  { key: 'reading', rating: 5 },
  { key: 'listening', rating: 5 },
  { key: 'writing', rating: 4 },
  { key: 'speaking', rating: 4 },
] as const;

export const STUDY_METHODS = [
  { key: 'marioVergara', href: 'https://www.instagram.com/mairovergara/' },
  { key: 'duolingo' },
  { key: 'foreignFilms' },
  { key: 'conversation' },
] as const;

export const STUDYING_LANGUAGES = [
  { key: 'spanish', code: 'ES' },
  { key: 'german', code: 'DE' },
] as const;
