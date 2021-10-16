import { Switch, Redirect, Route } from "react-router-dom";
import MasterLayout from "./layout";
import CryptoPage from "./pages/CryptoPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <MasterLayout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/crypto" />
        </Route>
        <Route path="/crypto" exact component={HomePage} />
        <Route path="/crypto/details" exact component={CryptoPage} />
        <Route path="*" component={HomePage} />
      </Switch>
    </MasterLayout>
  );
}

export default App;
