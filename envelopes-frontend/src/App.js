import React from 'react';
import EnvelopeList from './components/EnvelopeList';
import AddEnvelope from './components/AddEnvelope';
import UpdateEnvelope from './components/UpdateEnvelope';
import FundsTransfer from './components/FundsTransfer';

import './App.css';
import { envelopes } from '../../budgetData';

function App() {
  const [envelopes, setEnvelopes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/envelopes')
      .then(response => {
        if(!response.ok) {
          throw new Error("Error fetching envelopes");
        }
        return response.json();
  })
  .then(data => {
    setEnvelopes(data);
    setLoading(false);
  })
  .catch(error => {
    setError(error.message);
    setLoading(false);
  });
  }, []);

 if (loading) {
   return <div>Loading...</div>;
 }

 if (error) {
   return <div>Error: {error}</div>;
 }

  return (
    <div className="App">
      <h1>Envelopes</h1>
      <EnvelopeList envelopes={envelopes} />
      <AddEnvelope />
      <UpdateEnvelope />
      <FundsTransfer />
    </div>
  );
}

export default App;
