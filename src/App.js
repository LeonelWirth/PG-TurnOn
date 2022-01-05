import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./Components/Login";

function App() {
  return (
    <BrowserRouter>
      <h1>HOLAhola</h1>
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
