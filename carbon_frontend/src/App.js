import './App.css';
import Footer from './components/footer/footer';
import LandingPage from './components/landingPage/index.js'
import Header from './components/header/header.js'

function App() {
  return (
    <div className="App">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
