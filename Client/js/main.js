window.onload = ()=>{
    const body = document.getElementById('body-main')
    const container = document.createElement('div')
    const back = document.createElement('div')
    back.textContent = "Go Back"
    back.addEventListener('click',mainMenu)
    const logout = document.createElement('button')
    const lgoutDiv = document.createElement('div')
    lgoutDiv.id = 'lgout'
    logout.textContent = "Logout"
    logout.id = 'lgoutBtn'
    lgoutDiv.appendChild(logout)
    
    checkLoggedUser();

    function salesBranched(){
        const nl = document.createElement('div')
        nl.textContent = "New Line"
        nl.id = 'nl'
        const al = document.createElement('div')
        al.textContent = "All Lines"
        al.id = 'al'
    }

    function mainMenu(){ 
        container.innerHTML = ''
        main(container); 
    }

    function sales(div){ // sales section
        const lines = document.createElement('div')
        lines.id = 'lines'
        lines.textContent = "Lines"
        const dsl = document.createElement('div')
        dsl.id = 'dsl'
        dsl.textContent = "DSL"
        const terminal = document.createElement('div')
        terminal.id = 'terminal'
        terminal.textContent = "Terminal"
        const mnp = document.createElement('div')
        mnp.id = 'mnp'
        mnp.textContent = "MNP"
        div.append(lines,dsl,terminal,mnp,back)
    }

    function srs(div){ // SRs section
        const newSR = document.createElement('div')
        newSR.textContent = "New SR";
        const srs = document.createElement('div')
        srs.textContent= "All SRs"
        div.append(newSR,srs,back)
    }

    function eventHandler(){ // unifed event listener function to handle navigation
        switch(this.id){
            case "sales":
                container.innerHTML = ""
                sales(container)
                break;
            case "srs":
                container.innerHTML = ''
                srs(container)
                break;
            case "mr":
                window.alert("soon ...")
                break;
            case "tc":
                window.alert("soon ...")
                break;
            case "bug":
                window.alert("soon ...")
        }
        }

    function main(div){ // main menu elements
        const sales = document.createElement('div')
        sales.textContent = "Sales"
        sales.id = "sales"
        const srs = document.createElement('div')
        srs.textContent = "SRs"
        srs.id='srs'
        const monthlyReport = document.createElement('div')
        monthlyReport.textContent = "Monthly Report"
        monthlyReport.id = 'mr'
        const targetCalculator = document.createElement('div')
        targetCalculator.textContent = "Target Calculator"
        targetCalculator.id = 'tc'
        const bug = document.createElement('div')
        bug.textContent = "Report a bug"
        bug.id = 'bug'
        // bulk add event listener and class
        const menuElements = [sales,srs,monthlyReport,targetCalculator,bug]
        for(i in menuElements) {
            menuElements[i].addEventListener('click',eventHandler)
        }
        div.append(sales,srs,monthlyReport,targetCalculator,bug)
    }

    function checkLoggedUser(){     //check if user is logged
        const user = document.cookie.slice('5')
        if(user.length < 2){
            window.location.assign(window.origin);
        } else  {
            const userID = document.createElement('h3')
            userID.id = "user"
            container.classList.add('container')
            container.id = 'container'
            body.append(userID)
            body.append(container)
            const xhr = new XMLHttpRequest()
            xhr.open('post','/check')
            xhr.setRequestHeader('content-type','application/json')
            xhr.send(JSON.stringify({
                user : user
            }))
            xhr.onload = ()=>{
                if(xhr.status !== 200) {
                    window.location.assign(window.origin)
                } else {
                    const userID = document.getElementById('user')
                    userID.innerHTML = "Staff ID : " + `<span>${document.cookie.split('=')[1]}</span>`
                    main(container)
                    // body.append(lgoutDiv)
                }
            }
        }
    }

}