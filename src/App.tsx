import React, { useEffect, useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import getWord from './services/getWord';

interface ButtonStyled {
  primary?: boolean;
  variant: string;
  size: string;
}

interface Word {
  word: string;
}

const StyledButton = styled.button<ButtonStyled>`
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

function App() {
  const [wordToSearch, setWordToSearch] = useState<string>('soup');
  const [words, setWords] = useState<Array<Word>>([]);

  const search = (word: string) => {
    async function fetchMyAPI() {
      const resp = await getWord(word);
      setWords(resp);
    }

    fetchMyAPI();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => search(wordToSearch), []);

  const searchOnEnter = (key: String) =>
    key === 'Enter' && search(wordToSearch);

  return (
    <Router>
      <Nav>
        <Nav.Item>
          <Link to="/">Home</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/about">About</Link>
        </Nav.Item>
      </Nav>
      <Switch>
        <Route path="/about">
          <div>This is the about page!</div>
        </Route>
        <Route path="/">
          <Container className="p-3">
            <Jumbotron>
              <h1 className="header">Guess the completed word</h1>
            </Jumbotron>

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
                onKeyDown={(e) => searchOnEnter(e.key)}
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
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
