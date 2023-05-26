window.onload = ()=>{
    //check if user is logged
    const user = document.cookie.slice('5')
    if(user.length < 2){
        window.location.assign(window.origin);
    }

    const xhr = new XMLHttpRequest()
    xhr.open('post','/check')
    xhr.setRequestHeader('content-type','application/json')
    xhr.send(JSON.stringify({
        user : user
    }))
    xhr.onload = ()=>{
        if(xhr.status !== 200) {
            window.location.assign(window.origin)
        }
    }
}