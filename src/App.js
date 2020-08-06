import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

import HomePage from "./components/HomePage"
import Details from "./components/Details"

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        contrastText: '#ffcc00',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route
              crossorigin
              path="/:id"
              component={() => <Details />}
            />
            <Route
              crossorigin
              path="/"
              component={() => <HomePage />}
            />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
