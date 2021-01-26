import './App.css';
import Navbar from './components/Navbar'
import PastPaperPage from './components/PastPaperPage'

function App() {
  return (
    <div className="App">
      <Navbar />
      <section className="app__content">
        <PastPaperPage />
      </section>
      
    </div>
  );
}

export default App;
