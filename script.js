let datas=[]

if(localStorage.getItem('newTask') !== null){
    datas=JSON.parse(localStorage.getItem('newTask'))
}

let btnAdd=document.getElementById('btnAdd')
let txtTaskName=document.getElementById('txtTaskName')
let btnDel=document.getElementById('btnDel')
let p=document.querySelectorAll('.option p')
let tasklist=document.getElementById('task-list');

let update=false;
let updateid;
let select='all'

btnAdd.addEventListener('click',btnAddTask)
btnDel.addEventListener('click',btnDelTask)
btnAdd.addEventListener('keypress',keyEnter)

tasksAdd()

for(let filter of p){
    filter.addEventListener("click",function(event){
        document.querySelector('p.selected').classList.remove("selected")
        filter.classList.add('selected')
        select = filter.id
        tasksAdd()
        event.preventDefault()
    })
}

function tasksAdd() {
    tasklist.innerHTML=""
    for(let data of datas){
        if(select === data.status || select == 'all'){
            let status=data.status=='compleded'?'checked':''
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
}

function check(status,id) {
    if(status.checked){
        status.nextElementSibling.classList.add('checked')
        statusFun('compleded',id)
    }else{
        status.nextElementSibling.classList.remove('checked')
        statusFun('unfinished',id)
    }
    localStorage.setItem('newTask',JSON.stringify(datas))
}

function statusFun(info,id) {
    for(let data of datas){
        if(data.id == id){
            data.status=info
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
    localStorage.setItem('newTask',JSON.stringify(datas))
    event.preventDefault()
}

function deleteTask(id) {
    let deleteId;
    deleteId=datas.findIndex(data=>data.id==id)
    datas.splice(deleteId,1);
    tasksAdd()
    localStorage.setItem('newTask',JSON.stringify(datas))
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
            datas.push({"id":lastnumber,"name":txtTaskName.value,'status':'unfinished'})
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
        localStorage.setItem('newTask',JSON.stringify(datas))
    }
    event.preventDefault();
}