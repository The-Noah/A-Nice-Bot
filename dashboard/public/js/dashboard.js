function generateRandomString(){
  const rand = Math.floor(Math.random() * 10);
  let randStr = "";

  for(let i = 0; i < 20 + rand; i++){
    randStr += String.fromCharCode(33 + Math.floor(Math.random() * 94));
  }

  return randStr;
}

window.onload = () => {
  const match = window.location.hash.match(/access_token=(.+?)&token_type=(.+?)&state=(.+?)(?:&|$)/);

  if(match){
    const [, access_token, token_type, urlState] = match;
    const stateParameter = localStorage.getItem("stateParameter");

    if(btoa(stateParameter) !== decodeURIComponent(urlState)){
      console.log("You may have been clickjacked!");
      alert("You may have been clickjacked!");
      return;
    }
    
    window.location = `/dashboard#access_token=${access_token}&token_type=${token_type}`;
  }else{
    const randStr = generateRandomString();
    localStorage.setItem("stateParameter", randStr);

    document.getElementById("login").href += `&state=${btoa(randStr)}`;
  }
}