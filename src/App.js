import "./App.css";
import { Outlet } from "react-router";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
