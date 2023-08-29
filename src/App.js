import "./App.css";
import { EasybaseProvider } from "easybase-react";
import ebconfig from "./ebconfig";
import HeightContainer from "./HeightContainer";
import Keyword from "./Keyword";
import MetContainer from "./MetContainer";
import MtaContainer from "./MtaContainer";
import ActorContainer from "./ActorContainer";
import PlayerContainer from "./PlayerContainer";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import Home from "./Home";

const App = () => {
  return (
    <EasybaseProvider ebconfig={ebconfig}>
      <HashRouter>
        <Switch>
          <Route path="/height">
            <HeightContainer />
          </Route>
          <Route path="/keyword">
            <Keyword />
          </Route>
          <Route path="/art">
            <MetContainer />
          </Route>
          <Route path="/mta">
            <MtaContainer />
          </Route>
          <Route path="/actor">
            <ActorContainer />
          </Route>
          <Route path="/wsl">
            <PlayerContainer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </HashRouter>
    </EasybaseProvider>
  );
};

export default App;
