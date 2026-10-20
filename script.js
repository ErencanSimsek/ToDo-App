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
                <a href="#" onclick="deleteTask(${data.id})"><i class="fa-solid fa-trash"></i></a>
            </li>
        `
        tasklist.insertAdjacentHTML('beforeend',task)
    }
}

let btnAdd=document.getElementById('btnAdd')

btnAdd.addEventListener('keypress',function(event){
    if(event.key == 'Enter'){
        btnAddTask
    }
})

function deleteTask(id) {
    let deleteId;
    deleteId=datas.findIndex(data=>data.id==id)
    datas.splice(deleteId,1);
    tasksAdd()
}

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