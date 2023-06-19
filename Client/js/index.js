const loginBtn = document.getElementById("login");
const response = document.getElementById("message");
const userInput = document.getElementById("id");
const passInput = document.getElementById("pass");
console.log(userInput , passInput);

userInput.addEventListener('keydown',enterSignIn);
passInput.addEventListener('keydown',enterSignIn);

loginBtn.addEventListener('click',signIn);

function enterSignIn(e){
    if(e.key == 'Enter'){
        signIn(e);    
    }
}

function signIn(e){
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    const formDaTa = {
        staffID: document.getElementById("id").value,
        pass: document.getElementById("pass").value
    }
    xhr.open("POST","user/login",false);
    xhr.setRequestHeader('content-type','application/json');
    xhr.send(JSON.stringify(formDaTa));
    if(xhr.status === 401){
        response.textContent=JSON.parse(xhr.responseText).message;

    }
    if(xhr.status === 200){
        window.location.assign(xhr.responseURL)
    }    
}