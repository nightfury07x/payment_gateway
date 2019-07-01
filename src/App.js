import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreditCardForm from './Components/Form'
import Process from './Components/Process'

import './App.css'
  
class App extends React.Component {


  render() {

    return (
      <div>
        <Router>
        <Route exact path="/" component={() => <CreditCardForm/>} />
          <Route path="/process" component={Process} />
        </Router>
      </div>
    )
  }

}



export default App;
