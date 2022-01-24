import './App.css';

import logo from './assets/aws_logo.png';
import Dropdown from './components/dropdown/Dropdown';
import { dropdownData } from './utils/dropdown_data';
import { GetSearch } from './components/get_search/GetSearch';
import { PostRequest } from './components/ml_endpoint/PostRequest';
import Dictaphone from "./components/voice_search/Dictaphone";

function App() {

  return (
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

        <Dictaphone />
        <br></br>
        <br></br>
        <hr></hr>
        <GetSearch />
        <br></br>
        <br></br>
        <hr></hr>
        <PostRequest />
        
      </div>

    </div>
  );
}

export default App;
