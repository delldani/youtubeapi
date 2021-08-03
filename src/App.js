function App() {
  const onClick = () => {
    const str = window.location.href;
    let token = "";
    let isToken = false;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "&") {
        break;
      }
      if (isToken) {
        token = token + str[i];
      }

      if (str[i] === "=") {
        isToken = true;
      }
    }

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
  };

  return (
    <div className="App">
      <button onClick={onClick}>trigger</button>
      <br />
      <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&redirect_uri=https://localhost:3000&response_type=token&client_id=510827311023-etegid0lap83anh9ie0ikvklh7l0t4ue.apps.googleusercontent.com">
        Visit{" "}
      </a>
    </div>
  );
}

export default App;
