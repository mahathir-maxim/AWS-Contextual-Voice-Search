import './App.css';
import React, { useEffect, useState } from "react";
import Search from './components/search/Search.js';
import { CompanyData } from './components/company_data/CompanyData';
import logo from './assets/aws_logo.png';
import Dropdown from './components/dropdown/Dropdown';
import { dropdownData } from './utils/dropdown_data';

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
        <p> Welcome to Amazon Contextual Voice Search app! </p>
        <Search />
        <span>&nbsp;</span>
        <img className="logo" src={logo} alt="Logo" />
      </header>
      <div className="App-content">
        <span>&nbsp;</span>
        <CompanyData cikData={companyData} />
        <div className="accordion">
          {dropdownData.map(({ title, content }) => (
            <Dropdown title={title} content={content} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
