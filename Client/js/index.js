const loginBtn = document.getElementById("login");
const response = document.getElementById("message");

loginBtn.addEventListener('click',signIn);

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
    response.textContent=JSON.parse(xhr.responseText).message;
}