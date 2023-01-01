import "./App.css";
import { Home } from "./components/Home";
import { ReducerContextWrapper } from "./store/reducerContext";

function App() {
  return (
    <ReducerContextWrapper>
      <div className="App">
        <Home />
      </div>
    </ReducerContextWrapper>
  );
}

export default App;
