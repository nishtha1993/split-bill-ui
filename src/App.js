import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [healthStatus, setHealthStatus] = useState('');

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    try {
      const proxyUrl = "https://cors-everywhere.herokuapp.com/"
      // const url = "http://127.0.0.1:8080" // for local testing
      const url = "https://split-bill-ms.aemp0baega29a.us-east-1.cs.amazonlightsail.com/" // for testing with the deployed cloud app
      const requestUrl = proxyUrl + url + "/health"
      console.log(`Calling the request url ${requestUrl}`)
      //const response = await fetch(requestUrl);
      const response = await fetch(requestUrl, {
                                    method: 'GET',
                                    headers: {
                                      'Access-Control-Allow-Origin': '*'
                                    },
                                  });
                                    
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.text();
      setHealthStatus(data);
    } catch (error) {
      console.error('Error fetching health status:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Health Status Response: {healthStatus}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
