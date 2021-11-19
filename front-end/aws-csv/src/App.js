import './App.css';
import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import Search from './components/search/Search.js';
import { CompanyData } from './components/company_data/CompanyData';

function App() {

  // To hold searched company's data for front end display
  const [companyData, setCompanyData] = useState([])
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');

  // Fetch from python server
  useEffect(() => {
    fetch("/" + query + "/target").then(response =>
      response.json().then(data => {
        setCompanyData(data.entityName);
      })
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Amazon Contextual Voice Search app!
        </p>
        <Search />
        <CompanyData cikData={companyData} />
      </header>
    </div>
  );
}

export default App;
