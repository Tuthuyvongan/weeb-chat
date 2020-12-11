import { userConstants } from "./constants";
import  firebase from 'firebase';

export const getRealTimeUsers = (uid) =>{
    return async (dispatch) => {
        dispatch({type : `${userConstants.GET_REALTIME_USERS}_REQUEST`});
        const users = [];
        firebase.database().ref("Users").on('value', (snapshot)=>{
            snapshot.forEach((childSnapshot)=>{
                var childData = childSnapshot.val();
               if (childSnapshot.key != uid){
                    users.push(childData);
               }
            })
        })
        console.log(users);
        dispatch({
            type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
            payload: {users}
        });
    }
}