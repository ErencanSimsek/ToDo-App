let datas=[
    {"id":1,"name":"Task 1",'status':'cancel'},
    {"id":2,"name":"Task 2",'status':'cancel'},
    {"id":3,"name":"Task 3",'status':'cancel'},
    {"id":4,"name":"Task 4",'status':'select'}
]

let btnAdd=document.getElementById('btnAdd')
let txtTaskName=document.getElementById('txtTaskName')
let btnDel=document.getElementById('btnDel')
let all=document.querySelector('#all')
let compleded=document.querySelector('#compleded')
let unfinished=document.querySelector('#unfinished')
let tasklist=document.getElementById('task-list');

let update=false;
let updateid;
let select='all'

btnAdd.addEventListener('click',btnAddTask)
btnDel.addEventListener('click',btnDelTask)
btnAdd.addEventListener('keypress',keyEnter)
all.addEventListener('click',allFun)
compleded.addEventListener('click',complededFun)
unfinished.addEventListener('click',unfinishedFun)

tasksAdd()

function allFun(event) {
    selected(all,compleded,unfinished)
    select="all"
    tasksAdd()
    event.preventDefault()
}

function complededFun(event) {
    selected(compleded,all,unfinished)
    select='compleded'
    tasksAdd()
    event.preventDefault()
}

function unfinishedFun(event) {
    selected(unfinished,all,compleded)
    select='unfinished'
    tasksAdd()
    event.preventDefault()
}

function selected(add,remove1,remove2) {
    add.classList.add('selected')
    remove1.classList.remove('selected')
    remove2.classList.remove('selected')
}

function tasksAdd() {
    tasklist.innerHTML=""
    for(let data of datas){
        let status=data.status=='select'?'checked':''
        if(select == "all"){
            task(status,data.id,data.name,data.status)
        }else if(select == 'compleded' && data.status == "select"){
            task(status,data.id,data.name,data.status)
        }else if(select == 'unfinished' && data.status == 'cancel'){
            task(status,data.id,data.name,data.status)
        }
    }
}

function task(status,id,name,datastatus) {
    let task=`
        <li class="list-group-item">
            <input type="checkbox" onclick="check(this,${id})" class="form-check-input" ${status} id="${id}" >
            <label for="${id}" class="form-check-label ${status}" ${datastatus}>${name}</label>
            <a href="#" onclick="deleteTask(${id})"><i class="fa-solid fa-trash"></i></a>
            <a href="#" onclick='updateTask(${id}, "${name}")'><i class="fa-solid fa-pencil"></i></a>
        </li>
    `
    tasklist.insertAdjacentHTML('beforeend',task)
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

function keyEnter(event){
    if(event.key == 'Enter'){
        btnAddTask
    }
}

function btnDelTask(event) {
    datas.splice(0,datas.length)
    tasksAdd()
    event.preventDefault()
}

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