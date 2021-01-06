import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRealTimeConversations, getRealTimeUsers, updateMessage } from "../../actions";
import Layout from "../../components/Layout";
import "./style.css";
import firebase from "firebase";

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
  const [imageUrl, setImageUrl] = useState([]);

  let unsubcribe;
 
  useEffect(() => {
    getImageUrl();
  }, []);

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
        isView: false,
        type: "text",
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
  //img upload
  const readImages = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref('images');
    const imageRef = firebase.database().ref('images').child('daily');
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
      imageRef.set(url);
      const newState = [...imageUrl, { url }];
      setImageUrl(newState);
    });
    
    const imgObject = {
      sender: auth.uid,
      receiver: userUid,
      isView: false,
      type: "image",
      message
    }

    if ( message !== ""){
      dispatch(updateMessage(imgObject))
      .then(()=>{
        setMessage('');
      })
    }

  };

  const getImageUrl = () => {
      const newState = [...imageUrl];
      setImageUrl(newState);
  };
  //console.log("url", imageUrl);

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
            {imageUrl
                ? imageUrl.map(({ url }) => {
                    return (
                      <div >
                        <img src={url} alt="" />
                      </div>
                    );
                  })
                : ''}
          </div>
          {
            chatStarted ?
            <div className="chatControls">
              <div class="image-upload">
              <label for="file-input">
                <img src="https://bom.to/zzoDZuDh"/>
              </label>
              <input id="file-input" type="file" onChange={readImages}  />
            </div> 
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