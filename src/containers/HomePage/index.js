import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRealTimeConversations, getRealTimeUsers, updateMessage } from "../../actions";
import Layout from "../../components/Layout";
import "./style.css";



const USer = (props) => {


const {user, onClick} = props;
    
   return (
    <div onClick={()=> onClick(user)} className="displayName">
    <div className="displayPic">
      <img  
      src={user.imageURL}
      alt=""
    />

    </div>
    <div style={{display:'flex', flex: 1, justifyContent:'space-between', margin: "0 10px" }}>
      <span style={{ fontWeight: 500 }}>{user.username}</span>
      <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
    </div>
  </div>
   );
}

const HomePage = (props) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  let unsubcribe;
 
  
  useEffect(()=>{
    unsubcribe = dispatch(getRealTimeUsers(auth.uid))
    .then(unsubcribe=>{
        return unsubcribe;
    })
    .catch(error =>{
      console.log(error);
    })

  


  }, []);

  useEffect(()=>{
      return () => {
        unsubcribe.then(f => f()).catch(error => console.log(error));
      }
  }, []);


  const initChat = (user) => {
      setChatStarted(true)
      setChatUser(`${user.username}`)
      setUserUid(user.id);
      console.log(user);


      dispatch(getRealTimeConversations({uid_1: auth.uid, uid_2: user.id}));  
  }


  const submitMessage = (e) =>{

      const msgObject = {
        sender: auth.uid,
        receiver: userUid,
        message
      }

      if ( message !== ""){
        dispatch(updateMessage(msgObject))
        .then(()=>{
          setMessage('');
        })
      }

      console.log(msgObject);
  }

  //console.log(user);

  return (
    <Layout>
      <section className="container">
        <div className="listOfUsers">
          {
            user.users.length > 0 ?
            user.users.map(user => {
              return (
                <USer 
                onClick={initChat}
                key ={user.uid} 
                user={user}
                />
              );
            }) : null
          }
          
        </div>
        <div className="chatArea">
          
          <div className="chatHeader"> 
          {
            chatStarted ? chatUser : ''
          }
          </div>
          <div className="messageSections">
            {
              chatStarted ?
              user.chats.map(chats => 
                <div style={{ textAlign: chats.sender == auth.uid ? 'right' : 'left' }}>
                <p className="messageStyle">{chats.message}</p>
              </div> 
              )
              : null
            }
          </div>
          {
            chatStarted ?
            <div className="chatControls">
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message"
            />
            <button onClick={submitMessage}>Send</button>
          </div> : null
          }
          
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;