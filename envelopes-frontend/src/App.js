import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import EnvelopeList from './components/envelopeList';
import CreateEnvelope from './components/CreateEnvelope';
import TransferMoney from './components/transferMoney';
import DeleteEnvelope from './components/deleteEnvelope';

import './App.css';


const App = () => {
  return (
    <Router>
    <div className="App">
        <h1>Envelope Manager</h1>
        <nav>
          <ul><li><Link to="/">Envelopes</Link></li>
          <li><Link to="/create">Create</Link></li>
          <li><Link to="/transfer">Transfer</Link></li>
          <li><Link to="/delete">Delete</Link></li></ul>
        </nav>

        <Routes>
        <Route exact path="/" element={<EnvelopeList/>}/>
        <Route path="/create" element={<CreateEnvelope/>}/>
        <Route path="/transfer" element={<TransferMoney/>}/>
        <Route path="/delete" element={<DeleteEnvelope name={"Some Envelope"}/>}/>
      </Routes>
    </div>
    </Router>
  );
};

export default App;