import React from "react";

function App() {

const [token,setToken] = React.useState('');

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

const onClickChanelVids=()=>{

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
  
//   GET /youtube/v3/channels?part=id&mine=true HTTP/1.1
// Host: www.googleapis.com
// Authorization: Bearer ACCESS_TOKEN

// POST /o/oauth2/token HTTP/1.1
// Host: accounts.google.com
// Content-Type: application/x-www-form-urlencoded

// client_id=21302922996.apps.googleusercontent.com&
// client_secret=XTHhXh1SlUNgvyWGwDk1EjXB&
// refresh_token=1/6BMfW9j53gdGImsixUH6kU5RsR4zwI9lUVX-tqf8JXQ&
// grant_type=refresh_token

// https:// accounts.google.com/

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
  return (
    <div className="App">
      <button onClick={onClickAutenticate}>Autenticate..</button>
      <br />
      <button onClick={onClickGetToken}>get token</button>
      <br />
      <button onClick={onClickChanelVids}>get channel videos from youtube</button>
      <br />
      <button onClick={onClickNewToken}>token info</button>
      <br />
     
      <h5>
        Token : {token}
      </h5>
    </div>
  );
}

export default App;

