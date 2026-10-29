import { HashRouter as Router , Routes as Switch, Route } from 'react-router-dom';
import MainPage from "./pages/Main";
import Graph from './pages/Graph';
import New from './pages/New';

function App() {
  return (
    <div className="App">
      <div className="App-splitter">
        <Router>
          <Switch>
            <Route path="/" element={<MainPage />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/new" element={<New />} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
