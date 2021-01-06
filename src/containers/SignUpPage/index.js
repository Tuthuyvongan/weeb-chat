import React, { useState } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { signup } from "../../actions/auth_actions";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
 * @author
 * @function SignUpPage
 **/

const SignUpPage = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const signupUser = (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };

    dispatch(signup(user));
  };

  if (auth.authenticated){
    return <Redirect to={'/'}/>
  }


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
            <br></br>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <br></br>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <br></br>
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
