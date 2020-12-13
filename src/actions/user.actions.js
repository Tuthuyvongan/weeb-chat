import { userConstants } from "./constants";
import  firebase from 'firebase';

export const getRealTimeUsers = (uid) =>{
    return async (dispatch) => {
        dispatch({type : `${userConstants.GET_REALTIME_USERS}_REQUEST`});
        
        const unsubcribe = firebase.database().ref('Users/').on('value', (snapshot)=>{
            const users = [];
            snapshot.forEach((childSnapshot)=>{
                var childData = childSnapshot.val();
                //tru ra user da dang nhap
                if (childData.id != uid){
                    users.push(childData);
                }
            }) 
            if ( users.length > 0 ){
                dispatch({
                    type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
                    payload: {users},
                });
            }
        })
        
        //console.log(users);
        return unsubcribe;
    }
}
export const updateMessage = (msgObject) =>{
    return async dispatch => {
        firebase.database().ref('Chats/').push({
            ...msgObject
        })
        .then((data)=> {
            console.log(data);
            
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const getRealTimeConversations = (user) =>{
    return async dispatch => {

        firebase.database().ref('Chats/').on('value',(snapshot)=>{
            const chats = [];
            snapshot.forEach((childSnapshot1) => {
            var childData1 = childSnapshot1.val();
                if (
                   (childData1.sender == user.uid_1 && childData1.receiver == user.uid_2
                     || childData1.sender == user.uid_2 && childData1.receiver == user.uid_1)){
                        chats.push(childData1);
                    }
                })
            if (chats.length > 0){
                dispatch({
                    type: userConstants.GET_REALTIME_MESSAGES,
                    payload: {chats}
                })
            }else{
                dispatch({
                    type: `${userConstants.GET_REALTIME_MESSAGES}_FAILURE`,
                    payload: {chats}
                })
            }
            console.log(chats);
        })
        
    }
}