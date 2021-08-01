
function App() {

  const onClick = ()=>{
    const str = window.location.href;
    let token = '';
    let isToken = false;
   console.log(str);
   for(let i = 0; i < str.length; i++){
    if(str[i] === '&'){
      break;
    }
if(isToken){
  token = token + str[i];
}

    if(str[i] === '='){
      isToken = true;
    }

   };



   const URL = `https://www.googleapis.com/youtube/v3/channels?access_token=${token}&part=snippet,contentDetails&mine=true&key=AIzaSyBxocfML3lbHXfX5LhHLeAH4ZBrMFOaut8`;

   fetch(URL)
  .then(response => response.json())
  .then(data => console.log(data));
  }
  
  return <div className="App">

<button onClick={onClick}>trigger</button>
<br/>
<a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&redirect_uri=https://localhost:3000&response_type=token&client_id=510827311023-etegid0lap83anh9ie0ikvklh7l0t4ue.apps.googleusercontent.com">Visit </a>

  </div>;
}

export default App;
