import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

// Styles Import
import "./styles";

// Pages Import
import { AuthPages, Template, routes } from "./utils/RenderPages";

// Actions Import
import * as actions from "./store/actions";

class App extends Component {
  componentDidMount() {
    this.props.user();
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Template />}>
            {routes()} {AuthPages()}
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
