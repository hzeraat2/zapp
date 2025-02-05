import './App.css';
import SingleFileUploader from './components/SingleFileUploader';

function App() {
  return (
    <div className="App">
      <h2>Upload a CSV data file to process</h2>
      <SingleFileUploader />
    </div>
  );
}

export default App;
