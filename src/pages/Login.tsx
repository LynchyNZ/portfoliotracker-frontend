import React from 'react';
import { RouteComponentProps } from 'react-router';
import { AUTH_TOKEN } from 'helpers/constants';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const REGISTER_MUTATION = gql`
  mutation registerUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    registerUser(input: { email: $email, password: $password, firstName: $firstName, lastName: $lastName }) {
      user {
        id
        firstName
        lastName
        createdAt
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      jwtToken
    }
  }
`;

class Login extends React.Component<RouteComponentProps<any>> {
  state = {
    login: true,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    message: '',
  };

  render() {
    const { firstName, lastName, login, email, password, message } = this.state;

    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <h5>{message}</h5>
        <h5>TEST HANNAH</h5>
        <div className="flex flex-column">
          {!login && (
            <input
              value={firstName}
              onChange={(e) => this.setState({ firstName: e.target.value })}
              type="text"
              placeholder="First name"
            />
          )}
          {!login && (
            <input
              value={lastName}
              onChange={(e) => this.setState({ lastName: e.target.value })}
              type="text"
              placeholder="Last name"
            />
          )}
          <input
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Email address"
          />
          <input
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <Mutation
            mutation={login ? LOGIN_MUTATION : REGISTER_MUTATION}
            variables={{ firstName, lastName, email, password }}
            onCompleted={(data: any) => this._confirm(data)}
            onError={(error: any) => this._error(error)}
          >
            {(mutation: any) => (
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? 'login' : 'create account'}
              </div>
            )}
          </Mutation>
          <div className="pointer button" onClick={() => this.setState({ login: !login })}>
            {login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </div>
    );
  }

  _confirm = async (data: any) => {
    if (this.state.login) {
      const { jwtToken } = data.authenticate;
      this._saveUserData(jwtToken);
      this.props.history.push(`/stockchart`);
    } else {
      this.setState({ login: true });
      this.setState({ message: 'Account created successfully! You can now login.' });
    }
  };

  _error = async (error: any) => {
    console.log(error);
    if (this.state.login) {
      this.setState({ message: 'Login failed!' });
    } else {
      this.setState({ message: 'Register failed!' });
    }
  };

  _saveUserData = (token: any) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default Login;
