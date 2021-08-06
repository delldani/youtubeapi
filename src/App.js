import React from "react";

function App() {
  const UPLOADEDPLAYLIST =  'UUtB_jCoJFVnxmbo8PSQjA-g';
const [token,setToken] = React.useState('');
const CHANELID = 'UCtB_jCoJFVnxmbo8PSQjA-g';
const APIKEY = 'AIzaSyBxocfML3lbHXfX5LhHLeAH4ZBrMFOaut8';

  const onClickGetToken = () => {
    const str = window.location.href;
    let tok = "";
    let isToken = false;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "&") {
        break;
      }
      if (isToken) {
        tok = tok + str[i];
      }

      if (str[i] === "=") {
        isToken = true;
      }
    }
    setToken(tok);
  };

const onClickChannelVids=()=>{

  const base = "https://www.googleapis.com/youtube/v3/channels?";
    const tokenStr = `access_token=${token}&`;
    const part = "part=snippet,contentDetails&";
    const URL = `${base}${tokenStr}${part}mine=true&key=AIzaSyBxocfML3lbHXfX5LhHLeAH4ZBrMFOaut8`;

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items[0]);
        const playlistId =
          data.items[0].contentDetails.relatedPlaylists.uploads;

        fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?${tokenStr}${part}playlistId=${playlistId}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(playlistId);
            console.log(data);
          });
      });
  
}


const onClickNewToken = ()=>{
fetch(
  `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
  
  }
const onClickAutenticate =  ()=>{
  window.location = "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&redirect_uri=https://localhost:3000&response_type=token&client_id=510827311023-etegid0lap83anh9ie0ikvklh7l0t4ue.apps.googleusercontent.com";
};

const onClickChannelVideosNoAuth = ()=>{
  const part = "part=snippet,contentDetails&";
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&page&type=video&videoEmbeddable=true&key=AIzaSyBxocfML3lbHXfX5LhHLeAH4ZBrMFOaut8&channelId=${CHANELID}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

};


  return (
    <div className="App">
      <button onClick={onClickAutenticate}>Autenticate..</button>
      <br />
      <button onClick={onClickGetToken}>show token</button>
      <br />
      <button onClick={onClickChannelVids}>get channel videos from youtube with authentication</button>
      <br />
      <button onClick={onClickNewToken}>token info</button>
      <br />
      <button onClick={onClickChannelVideosNoAuth}>Public Channel videos with no authentication</button>
      <br />
     
      <h5>
        Token : {token}
      </h5>
    </div>
  );
}

export default App;

