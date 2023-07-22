window.onload = ()=>{
    const fragment = document.createDocumentFragment()
    const body = document.getElementById('body-main')
    const container = document.createElement('div')
    const back = document.createElement('div')
    const home = document.createElement('div')
    const nav = document.createElement('div') // parent element for nav buttons
    home.textContent = "Home"
    home.id = "home"
    home.classList.add('nav')
    home.addEventListener('click',goHome)
    back.textContent = "Go Back"
    back.id = "backBtn"
    back.classList.add('nav')
    back.addEventListener('click',goBack)
    const logout = document.createElement('button')
    const lgoutDiv = document.createElement('div')
    lgoutDiv.id = 'lgout'
    logout.textContent = "Logout"
    logout.id = 'lgoutBtn'
    lgoutDiv.appendChild(logout)
    const history = []; // an array to determine which element to be shown when click on go back btn
    function checkHistory(value){
        if(history.includes(value)){
            return null
        } else {
            history.push(value)
        }
    }
    function goHome(){
        container.innerHTML = ""
        main(container)
    }
    checkLoggedUser();
    function fastLink(main , sub){
        main.innerHTML=""
        main.setAttribute('currnet',sub.id)
        main.append(sub)
    }

    function goBack(){
        const currentDiv = history.length
        const target = history[currentDiv-1]
        switch(target){
            case "Main" :
                container.innerHTML = ''
                main(container)
                history.pop()
                break;
            case "Sales" :
                container.innerHTML = ''
                sales(container) 
                history.pop()
                break;
            case "Lines"    :
                container.innerHTML = ""
                linesBranched()
                history.pop()
                break;
            case "New Line" : 
                container.innerHTML = ""
                newLine()
                history.pop()
                break;
            case "Lines Branched": 
                container.innerHTML = ""
                linesBranched()
                history.pop()
                break;
            case "DSL" :
                container.innerHTML = ''
                sales(container) 
                history.pop()
                break;
            default:
                container.innerHTML = ""
                main(container)
                history.pop()
        }
        
    }
    function sales(div){ // sales section
        const lines = document.createElement('div')
        lines.id = 'lines'
        lines.textContent = "Lines"
        lines.addEventListener('click',linesBranched)
        const dsl = document.createElement('div')
        dsl.id = 'dsl'
        dsl.textContent = "DSL"
        dsl.addEventListener('click',dslBranched)
        const terminal = document.createElement('div')
        terminal.id = 'terminal'
        terminal.textContent = "Terminal"
        const mnp = document.createElement('div')
        mnp.id = 'mnp'
        mnp.textContent = "MNP"
        div.append(lines,dsl,terminal,mnp,back)
        checkHistory("Main")
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
        al.addEventListener('click',showAllLines)
        fragment.id = 'lines'
        fragment.append(nl,al,back)
        checkHistory("Sales")
        fastLink(container , fragment)
    }
    function showAllLines(){
        checkHistory('Lines Branched')
        const xhr = new XMLHttpRequest()
        xhr.open('post','/main/all')
        xhr.send()
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState === 4) {
                const data = JSON.parse(xhr.responseText)
                const div = document.createElement('div')
                div.id = 'allLinesContainer'
                const table = document.createElement('table')
                const tbody = document.createElement('tbody')
                tbody.innerHTML = `
                <tr>
                    <th>Line Type</th>
                    <th>Line Tier</th>
                    <th>MI</th>
                    <th>VC</th>
                    <th id="sellDate">Sell Date</th> 
                    <th>Origin</th>
                    <th>Select</th>
                </tr>
                `
                // <th>Combo</th>
                table.append(tbody)
                for(let i in data) {
                    const singleLine = document.createElement('tr')
                    const check = document.createElement('td')
                    check.innerHTML = `
                    <input type="checkbox" onChange="check()"></input>
                    `
                    const shortDate = new Date(data[i].Date).toISOString().split("T")[0].split("-")
                    const finalDate = `${shortDate[2]}-${shortDate[1]}-${shortDate[0].slice(2,4)}`
                    const item = {
                        id: data[i]._id,
                        type: data[i].LineType,
                        line: data[i].LineTier,
                        VC:data[i].LineVC === true ? 'Yes' : data[i].LineType === "Post" ? "-":"No",
                        lineMi:data[i].LineMI,
                        Combo:(data[i].LineVC && data[i].LineMI !=='None') ? 'Yes' : 'No',
                        sellDate: finalDate,
                        checked: check,
                        Origin: data[i].Origin === "Conversion" ? "Conv" : data[i].Origin
                    }
                    singleLine.innerHTML = `
                    <td>${item.type}</td>
                    <td>${item.line}</td>
                    <td>${item.lineMi}</td>
                    <td>${item.VC}</td>
                    <td id="sellDate">${item.sellDate}</td>
                    <td>${item.Origin}</td>
                    `
                    // <td>${item.Combo}</td>
                    singleLine.append(check)
                    tbody.append(singleLine)
                }
                fragment.innerHTML=''
                fragment.appendChild(table)
                fragment.appendChild(back)
                fastLink(container,fragment)
            }
        }
    }
    function newLine(){
        fragment.innerHTML='';
        const addLine = document.createElement('button')
        addLine.textContent = "Submit Line"
        addLine.addEventListener('click',submitLine)
        const planType = document.createElement('select')
        planType.id = 'LType'
        const plansTypes = ['Select plan','Pre','Post']
        // Pre section
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
        // post section
        const postTier = document.createElement('select')
        postTier.id = "PTier"
        const postTiers = ['Select Tier',300,500,700,1000]
        const origin = document.createElement('select')
        origin.id = "Origin"
        const originTypes = ["Select Origin","New Line","Conversion"]
        // organize all loops in one single function for future editing and debugging
        organizeForLoops(plansTypes,preLines,vcValue,miValue,postTiers,originTypes) 

        function organizeForLoops(types,tiers,vcValue,miValue,postTiers,postOrigin){
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
            for( let i in postTiers) {
                const option = document.createElement('option')
                if (postTiers[i] == 'Select Tier'){
                    option.value = ''
                    option.selected = 'selected'
                    option.disabled = true
                    option.hidden = 'hidden'    
                }
                option.value = postTiers[i]
                option.text = postTiers[i]
                postTier.append(option)
            }
            for( let i in postOrigin) {
                const option = document.createElement('option')
                if (postOrigin[i] == 'Select Origin'){
                    option.value = ''
                    option.selected = 'selected'
                    option.disabled = true
                    option.hidden = 'hidden'    
                }
                option.value = postOrigin[i]
                option.text = postOrigin[i]
                origin.append(option)
            }
        }

        fragment.append(planType,back)

        planType.addEventListener('change',function(){
            const checkType = planType.value == 'Pre' ? true : false
            if(checkType){
                fragment.append(planType,lines,vc,mi,date,addLine,back)
                fastLink(container,fragment)
            } else {
                fragment.append(planType,postTier,origin,date,addLine,back)
                fastLink(container,fragment)
            }
        })
        checkHistory('Lines')
        fastLink(container,fragment)
    }
    function dslBranched(){
        checkHistory('DSL')
        const fragment = document.createDocumentFragment();
        const newDsl = document.createElement('div')
        newDsl.id = "new-dsl"
        newDsl.textContent = "New DSL"
        const editDsl = document.createElement('div')
        editDsl.id = "edit-dsl"
        editDsl.textContent = "Update DSL"
        const showDsls = document.createElement('div')
        showDsls.id = "show-dsl"
        showDsls.textContent = "All DSLs"
        newDsl.addEventListener('click',newDSL)
        fragment.append(newDsl,editDsl,showDsls,back)
        fastLink(container,fragment)
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
    function newDSL(){
        const fragment = document.createDocumentFragment()
        const submit = document.createElement('button')
        submit.textContent = "Submit"
        submit.addEventListener('click',submitDSL)
        const labelLL = document.createElement('label')
        labelLL.textContent = "Landline Number: "
        const landLine = document.createElement('input')
        landLine.type = "Number"
        landLine.required = true
        landLine.id = "landline"
        const labelDate = document.createElement('label')
        labelDate.textContent = "Date: "
        const date = document.createElement('input')
        date.type = "Date"
        date.required = true
        date.id = "dateDsl"
        const labelMobile = document.createElement('label')
        labelMobile.textContent = "Mobile Number: "
        const mobile = document.createElement('input')
        mobile.type = "Number"
        mobile.required = true
        mobile.id = "mobile"
        labelLL.append(landLine)
        labelDate.append(date)
        labelMobile.append(mobile)
        fragment.append(labelLL,labelDate,labelMobile,submit,back)
        fastLink(container,fragment)       
    }
}
function submitLine(){
    const lType = document.getElementById('LType')
    const lTier = document.getElementById('LTier')
    const lvc = document.getElementById('VC')
    const lmi = document.getElementById('MI')
    const PTier = document.getElementById('PTier')
    const origin = document.getElementById('Origin')
    const sellDate = document.getElementById('date')
    const data ={
        lineType :lType.value ,
        lineTier : lType.value == "Pre" ? lTier.value : PTier.value,
        lVC : lType.value == "Pre" ? lvc.value : "-",
        lMi : lType.value == "Pre" ? lmi.value : "-",
        sellDate:sellDate.value,
        Origin : lType.value == "Pre" ? "-" : origin.value
    }
    const clean = [lTier,lvc,lmi,sellDate,PTier,origin]
    for(let i in clean){
        if(clean[i] == null) continue
        {
            clean[i].value=''
        }
    }
    if(data.lineType && data.lineTier && data.lVC && data.lMi && data.sellDate && data.Origin) {
        const xhr = new XMLHttpRequest();
        xhr.open('post','/main',false)
        xhr.setRequestHeader('content-type','application/json')
        xhr.send(JSON.stringify(data))
    }
}

function submitDSL(){
    const data = {
        landline: document.getElementById('landline').value,
        mobile:document.getElementById('mobile').value,
        date:document.getElementById('dateDsl').value
    }
    if (data.landline && data.mobile && data.date) {
        const xhr = new XMLHttpRequest()
        xhr.open('post','/main/dsl')
        xhr.setRequestHeader('content-type','application/json')
        xhr.send(JSON.stringify(data))
    }
}