window.onload = ()=>{
    const fragment = document.createDocumentFragment()
    const body = document.getElementById('body-main')
    const container = document.createElement('div')
    const back = document.createElement('div')
    back.textContent = "Go Back"
    back.id = "backBtn"
    back.addEventListener('click',goBack)
    const logout = document.createElement('button')
    const lgoutDiv = document.createElement('div')
    lgoutDiv.id = 'lgout'
    logout.textContent = "Logout"
    logout.id = 'lgoutBtn'
    lgoutDiv.appendChild(logout)

    const history = []; // an array to determine which element to be shown when click on go back btn
    
    checkLoggedUser();

    function fastLink(main , sub){
        main.innerHTML=""
        console.log(sub.id);
        main.setAttribute('currnet',sub.id)
        main.append(sub)
    }

    function linesBranched(){
        fragment.innerHTML='';
        const nl = document.createElement('div')
        nl.textContent = "New Line"
        nl.id = 'nl'
        nl.addEventListener('click',newLine)
        const al = document.createElement('div')
        al.textContent = "All Lines"
        al.id = 'al'
        fragment.id = 'lines'
        fragment.append(nl,al,back)
        fastLink(container , fragment)
    }

    function newLine(){
        fragment.innerHTML='';
        const addLine = document.createElement('button')
        addLine.textContent = "Submit Line"
        addLine.addEventListener('click',submitLine)
        const planType = document.createElement('select')
        planType.id = 'LType'
        const plansTypes = ['Select plan','pre','post']
        const vc = document.createElement('select')
        vc.id = "VC"
        const vcValue = ['V-Cash',true,false]
        const mi = document.createElement('select')
        mi.id = "MI"
        const miValue = ['MI','None',15,25,35,45,65,120,200,300]
        const date = document.createElement('input')
        date.type = 'date'
        date.id = 'date'
        const preLines = ['Select Tier',30,45,70,100,200,'14PTS']
        const lines = document.createElement('select')
        lines.id = 'LTier'

        organizeForLoops(plansTypes,preLines,vcValue,miValue) // organize all loops in one single function for future editing and debugging

        function organizeForLoops(types,tiers,vcValue,miValue){
            for( let i in types) {
                const option = document.createElement('option')
                if (types[i] == 'Select plan'){
                    option.value = ''
                    option.selected = 'selected'
                    option.disabled = true
                    option.hidden = 'hidden'    
                }
                option.value = types[i]
                option.text = types[i]
                planType.append(option)
            }
            for( let i in tiers) {
                const option = document.createElement('option')
                if (tiers[i] == 'Select Tier'){
                    option.value = ''
                    option.selected = 'selected'
                    option.disabled = true
                    option.hidden = 'hidden'    
                }
                option.value = tiers[i]
                option.text = tiers[i]
                lines.append(option)
            }
            for(let i in vcValue){
                const option = document.createElement('option')
                if (vcValue[i] == 'V-Cash'){
                    option.value = ''
                    option.selected = 'selected'
                    option.disabled = true
                    option.hidden = 'hidden'    
                }
                option.value = vcValue[i]
                option.text = vcValue[i]
                vc.append(option)
            }
            for(let i in miValue){
                const option = document.createElement('option')
                if (miValue[i] == 'MI'){
                    option.value = ''
                    option.selected = 'selected'
                    option.disabled = true
                    option.hidden = 'hidden'    
                }
                option.value = miValue[i]
                option.text = miValue[i]
                mi.append(option)
            }
        }
        fragment.append(planType,back)
        planType.addEventListener('change',function(){
            const checkType = planType.value == 'pre' ? true : false
            if(checkType){
                console.log('true');
                fragment.append(planType,lines,vc,mi,date,addLine,back)
                fastLink(container,fragment)
            } else {
                console.log('false');
                fragment.append(planType,back)
                fastLink(container,fragment)
            }
        })

       

        fastLink(container,fragment)
    }

    function goBack(){
        console.log(this); 
        container.innerHTML = ''
        main(container); 
    }

    function sales(div){ // sales section
        const lines = document.createElement('div')
        lines.id = 'lines'
        lines.textContent = "Lines"
        lines.addEventListener('click',linesBranched)
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


function submitLine(){
    const data ={
        lineType :document.getElementById('LType').value ,
        lineTier : document.getElementById('LTier').value,
        lVC : document.getElementById('VC').value,
        lMi : document.getElementById('MI').value,
        sellDate:document.getElementById('date').value
    }
    if(data.lineType && data.lineTier && data.lVC && data.lMi && data.sellDate) {
        const xhr = new XMLHttpRequest();
        xhr.open('post','/main',false)
        xhr.setRequestHeader('content-type','application/json')
        xhr.send(JSON.stringify(data))
    }
}