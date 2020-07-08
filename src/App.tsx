import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WordSearch from './components/WordSearch';

interface Tab {
  justify?: boolean;
  variant: string;
}

function App() {
  return (
    <Router>
      <Nav justify variant="tabs">
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
          <WordSearch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
