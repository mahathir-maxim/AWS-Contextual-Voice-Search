import './App.css';
import Search from './components/search/search.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Amazon Contextual Voice Search app!
        </p>
        <Search />
      </header>
    </div>
  );
}

export default App;
