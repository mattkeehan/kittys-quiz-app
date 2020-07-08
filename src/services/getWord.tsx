const baseUrl = 'https://api.datamuse.com';

export default async (wordPart: string) => {
  const url = `${baseUrl}/sug?s=${wordPart}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
