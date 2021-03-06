import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';
import { updateSearchTerm, updateWords } from '../store/actions';
import getWord from '../services/getWord';

interface ButtonStyled {
  primary?: boolean;
  variant: string;
  size: string;
}

interface Word {
  word: string;
  score: number;
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

const StyledJumbotron = styled(Jumbotron)`
  color: forestgreen;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid midnightblue;
  border-radius: 3px;
  background-color: #b0cfef;
  font-family: monospace;
`;

const StyledHeader = styled.h1`
  text-align: center;
`;

export default function WordSearch() {
  const [wordToSearch, setWordToSearch] = useState<string>('soup');
  const [words, setWords] = useState<Array<Word>>([]);
  const dispatch = useDispatch();

  const search = (word: string) => {
    async function fetchMyAPI() {
      const wordsFound = await getWord(word);
      setWords(wordsFound);
      dispatch(updateSearchTerm(wordToSearch));
      dispatch(updateWords(wordsFound));
    }

    fetchMyAPI();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => search(wordToSearch), []);

  const searchOnEnter = (key: String) =>
    key === 'Enter' && search(wordToSearch);

  return (
    <Container className="p-3">
      <StyledJumbotron>
        <StyledHeader className="header">Guess the completed word</StyledHeader>
      </StyledJumbotron>

      <ListGroup>
        {words.length &&
          words.map((item, key) => (
            <ListGroup.Item key={key}>
              {item.word} - {item.score}
            </ListGroup.Item>
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
  );
}
