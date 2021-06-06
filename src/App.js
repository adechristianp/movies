import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Layout from "./components/Layout";
import Home from "./components/Home";
import SingleMovieDetail from "./components/SingleMovieDetail";

const store = configureStore();
export default function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Layout>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/single">
              <SingleMovieDetail />
            </Route>
          </Layout>
        </Switch>
      </Provider>
    </Router>
  );
}

export const sum = (a, b) => {
  return a + b;
};
