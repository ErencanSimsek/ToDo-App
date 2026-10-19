let datas=[
    {"id":1,"name":"Task 1"},
    {"id":2,"name":"Task 2"},
    {"id":3,"name":"Task 3"},
    {"id":4,"name":"Task 4"}
]
tasksAdd()
function tasksAdd() {
    let tasklist=document.getElementById('task-list');
    tasklist.innerHTML=""
    for(let data of datas){
        let task=` 
            <li class="list-group-item">
                <input type="checkbox"class="form-check-input" id="${data.id}">
                <label for="${data.id}" class="form-check-label">${data.name}</label>
            </li>
        `
        tasklist.insertAdjacentHTML('beforeend',task)
    }
}

let btnAdd=document.getElementById('btnAdd')

btnAdd.addEventListener('click',btnAddTask)

btnAdd.addEventListener('keypress',function(event){
    if(event.key == 'Enter'){
        btnAddTask
    }
})

function btnAddTask(event) {
    let txtTaskName=document.getElementById('txtTaskName')
    let lastnumber=datas.length+1;
    if(txtTaskName == ''){
        alert('Please Enter Text!')
    }else{
        datas.push({"id":lastnumber,"name":txtTaskName.value})
        txtTaskName.value=''
        tasksAdd()
    }
    
    event.preventDefault();
}