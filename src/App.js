import React, { useEffect, useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import './App.css';

const baseUrl = 'https://api.datamuse.com';

const getWord = async (wordPart) => {
  const url = `${baseUrl}/sug?s=${wordPart}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};

function App() {
  const [wordToSearch, setWordToSearch] = useState('soup');
  const [words, setWords] = useState(0);

  const search = (wordToSearch) => {
    async function fetchMyAPI() {
      const resp = await getWord(wordToSearch);
      setWords(resp);
    }

    fetchMyAPI();
  };

  useEffect(() => search(wordToSearch), []);

  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">Guess the completed word</h1>
      </Jumbotron>

      {/* <div>{JSON.stringify(words)}</div> */}

      <ListGroup>
        {words.length &&
          words.map((item, key) => (
            <ListGroup.Item key={key}>{item.word}</ListGroup.Item>
          ))}
      </ListGroup>

      <p>Your word is {wordToSearch}</p>

      <div>
        <input
          type="text"
          value={wordToSearch}
          onChange={(e) => setWordToSearch(e.target.value)}
        />
      </div>

      <Button variant="flat" size="xxl" onClick={() => search(wordToSearch)}>
        Click me
      </Button>
    </Container>
  );
}

export default App;
