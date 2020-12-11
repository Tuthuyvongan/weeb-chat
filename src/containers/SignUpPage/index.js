import React, { useState } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { signup } from "../../actions";
import { useDispatch } from 'react-redux';

/**
 * @author
 * @function SignUpPage
 **/

const SignUpPage = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const signupUser = (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };

    dispatch(signup(user));
  };

  return (
    <Layout>
      <div className="signupContainer">
        <Card>
          <form onSubmit={signupUser}>
            <h3>Sign up</h3>

            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />

            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <div>
              <button>Sign up</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default SignUpPage;
