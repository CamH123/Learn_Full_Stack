let leads = [];

const deleteBtn = document.getElementById("delete-btn")
const inputBtn = document.getElementById("input-btn");
const saveBtn = document.getElementById("save-btn")
const inputField = document.getElementById("input-el");
const ul = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeaders"))

if (leadsFromLocalStorage){
    console.log(leadsFromLocalStorage)
    leads = leadsFromLocalStorage
    renderList(leads)
}

// Button Listerns
inputBtn.addEventListener("click", function(){
    leads.push(inputField.value);
    console.log(leads);
    inputField.value = "";
    localStorage.setItem("myLeaders", JSON.stringify(leads));
    renderList(leads);
})

deleteBtn.addEventListener("dblclick", () => {
    console.log("delete button clicked");
    leads = [];
    localStorage.setItem("myLeaders", JSON.stringify(leads));
    renderList(leads);
})

saveBtn.addEventListener("click", function(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        leads.push(tabs[0].url);
        localStorage.setItem("myLeaders", JSON.stringify(leads));
        renderList(leads);
    })
})


function renderList(input_list){
    let listItems = "";
    for (let i = 0; i < input_list.length; i++){
        console.log("rendering")
        listItems += `
            <li>
                <a target = '_blank' href = '${input_list[i]}'>
                    ${input_list[i]}
                </a>
            </li>
        `
    }   
    ul.innerHTML = listItems;
    console.log(listItems)
}

