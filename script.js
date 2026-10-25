let datas=[
    {"id":1,"name":"Task 1",'status':'cancel'},
    {"id":2,"name":"Task 2",'status':'cancel'},
    {"id":3,"name":"Task 3",'status':'cancel'},
    {"id":4,"name":"Task 4",'status':'select'}
]
tasksAdd()
function tasksAdd() {
    let tasklist=document.getElementById('task-list');
    tasklist.innerHTML=""
    for(let data of datas){
        let status=data.status=='select'?'checked':''
        let task=` 
            <li class="list-group-item">
                <input type="checkbox" onclick="check(this,${data.id})" class="form-check-input" ${status} id="${data.id}" >
                <label for="${data.id}" class="form-check-label ${status}" ${data.status}>${data.name}</label>
                <a href="#" onclick="deleteTask(${data.id})"><i class="fa-solid fa-trash"></i></a>
                <a href="#" onclick='updateTask(${data.id}, "${data.name}")'><i class="fa-solid fa-pencil"></i></a>
            </li>
        `
        tasklist.insertAdjacentHTML('beforeend',task)
    }
}

function check(status,id) {
    if(status.checked){
        status.nextElementSibling.classList.add('checked')
        statusFun('select',id)
    }else{
        status.nextElementSibling.classList.remove('checked')
        statusFun('cancel',id)
    }
}

function statusFun(info,id) {
    for(let data of datas){
        if(data.id == id){
            data.status=info
            console.log(data.status)
        }
    }
}

let btnAdd=document.getElementById('btnAdd')
let txtTaskName=document.getElementById('txtTaskName')
let btnDel=document.getElementById('btnDel')
let update=false;
let updateid;


btnAdd.addEventListener('click',btnAddTask)
btnDel.addEventListener('click',function(event) {
    datas.splice(0,datas.length)
    tasksAdd()
    event.preventDefault()
})

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

function updateTask(id, name){
    updateid=id;
    update=true;
    txtTaskName.value=name
    txtTaskName.focus()
    txtTaskName.classList.add('active')
}

function btnAddTask(event) {
    let lastnumber=datas.length+1;
    if(txtTaskName == ''){
        alert('Please Enter Text!')
    }else{
        if(!update){
            datas.push({"id":lastnumber,"name":txtTaskName.value})
        }
        else{
            for(let data of datas){
                if(data.id == updateid){
                    data.name=txtTaskName.value
                }
                update=false;
            }
        }
        txtTaskName.value=''
        tasksAdd()
    }
    event.preventDefault();
}