import firebase from "firebase";
import { authConstanst } from "./constants";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);
        const currentUser = firebase.auth().currentUser;
        const name = `${user.username}`;
        currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            firebase
              .database()
              .ref("Users/" + data.user.uid)
              .set({
                id: data.user.uid,
                imageURL: "default",
                search: user.username,
                status: "offline",
                username: user.username,
              })
              .then(() => {
                const loggedInUser = {
                  username: user.username,
                  uid: data.user.uid,
                  email: user.email,
                };
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                console.log("User logged in successfully");
                dispatch({
                  type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                });
              })
              .catch((error) => {
                console.log(error);
                dispatch({
                  type: `${authConstanst.USER_LOGIN}_FAILURE`,
                  payload: { error },
                });
              });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const signin = (user) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);
        const name = data.user.displayName;
        const username = name;

        const loggedInUser = {
          username,
          uid: data.user.uid,
          email: data.user.email,
        };
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        dispatch({
          type: `${authConstanst.USER_LOGIN}_SUCCESS`,
          payload: { user: loggedInUser },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: `${authConstanst.USER_LOGIN}_FAILURE`,
          payload: { error },
        });
      });
  };
};

export const isLoggedInUser = () => {
  return async (dispatch) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (user) {
      dispatch({
        type: `${authConstanst.USER_LOGIN}_SUCCESS`,
        payload: { user },
      });
    } else {
      dispatch({
        type: `${authConstanst.USER_LOGIN}_FAILURE`,
        payload: { error: "Login again please" },
      });
    }
  };
};

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstanst.USER_LOGOUT}_REQUEST` });
    //Now lets logout user
    
        firebase
        .auth()
          .signOut()
          .then(() => {
            //successfully
            localStorage.clear();
            dispatch({ type: `${authConstanst.USER_LOGOUT}_SUCCESS` });
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: `${authConstanst.USER_LOGOUT}_FAILURE`,
              payload: { error },
            });
          });
      
  };
};
