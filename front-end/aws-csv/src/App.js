import './App.css';
import React, { useEffect, useState } from "react";
import logo from './assets/aws_logo.png';
import Dropdown from './components/dropdown/Dropdown';
import { dropdownData } from './utils/dropdown_data';
import { GetSearch } from './components/get_search/GetSearch';
import { PostRequest } from './components/ml_endpoint/PostRequest';
export const UserContext = React.createContext();

function App() {

  // To hold searched company's data for front end display
  const [companyData, setCompanyData] = useState([])
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [visible, setVisible] = useState(false);

  // Fetch from python server
  useEffect(() => {
    fetch("/" + query + "/target").then(response =>
      response.json().then(data => {
        setCompanyData(data.entityName);
      })
    );
  }, []);

  return (
    <UserContext.Provider value="default">
      <div className="App">
        <header className="App-header">
          <div><br /></div>
          <div><br /></div>
          <p> Welcome to Amazon Contextual Search app! </p>
          <span>&nbsp;</span>
          <img className="logo" src={logo} alt="Logo" />
        </header>
        <div className="App-content">
          <span>&nbsp;</span>
          <div className="accordion">
            {dropdownData.map(({ title, content }) => (
              <Dropdown title={title} content={content} />
            ))}
          </div>

          <GetSearch />
          <br></br>
          <hr></hr>
          <PostRequest />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
