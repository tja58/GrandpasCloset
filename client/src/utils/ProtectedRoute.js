// Module Imports
import { Component } from "react";
import { Outlet, Navigate } from "react-router-dom";
import SecureLS from "secure-ls";
import { connect } from "react-redux";

// Component Imports
import * as actions from "../store/actions";
import LoadingScreen from "../components/LoadingScreen";

const ls = new SecureLS({ isCompression: false });

////////////////////////////////////////////////////////////////////////////
// Protected Route
////////////////////////////////////////////////////////////////////////////
class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <LoadingScreen />,
    };
  }

  async componentDidMount() {
    const token = await ls.get("token");

    // No Token - Redirect to Login Screen
    if (!token) {
      this.setState({ content: <Navigate to="/login" /> });
    }

    // props auth is null
    if (!this.props.auth) {
      // Get user
      const user = await this.props.user();

      // Wait for response
      Promise.all([user]).then((user) => {
        if (!user) {
          this.setState({ content: <Navigate to="/login" /> });
        } else {
          this.setState({ content: <Outlet /> });
        }
      });
    } else {
      // props auth is not null
      this.setState({ content: <Outlet /> });
    }
  }

  render() {
    return this.state.content;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, actions)(ProtectedRoute);
