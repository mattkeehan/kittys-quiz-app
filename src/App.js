import React, { useEffect, useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';
import './App.css';

const baseUrl = 'https://api.datamuse.com';

const getWord = async (wordPart) => {
  const url = `${baseUrl}/sug?s=${wordPart}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};

const StyledButton = styled.button`
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

function App() {
  const [wordToSearch, setWordToSearch] = useState('soup');
  const [words, setWords] = useState(0);

  const search = (word) => {
    async function fetchMyAPI() {
      const resp = await getWord(word);
      setWords(resp);
    }

    fetchMyAPI();
  };

  useEffect(() => search(wordToSearch), []);

  const searchOnEnter = (e) => {
    if (e.key === 'Enter') {
      search(wordToSearch);
    }
  };

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

      <p>
        Let's search for{' '}
        <input
          type="text"
          value={wordToSearch}
          onChange={(e) => setWordToSearch(e.target.value)}
          onKeyDown={searchOnEnter}
        />
      </p>

      <StyledButton
        variant="flat"
        size="xxl"
        onClick={() => search(wordToSearch)}
      >
        Search!
      </StyledButton>
    </Container>
  );
}

export default App;
