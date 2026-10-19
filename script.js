let datas=[
    {"id":1,"name":"Task 1"},
    {"id":2,"name":"Task 2"},
    {"id":3,"name":"Task 3"},
    {"id":4,"name":"Task 4"}
]

function tasksAdd(id,name) {
    let task=` 
        <li class="list-group-item">
            <input type="checkbox"class="form-check-input" id="${id}">
            <label for="${id}" class="form-check-label">${name}</label>
        </li>
    `
    document.getElementById('task-list').insertAdjacentHTML('beforebegin',task)
}

for(let data of datas){
    tasksAdd(data.id,data.name)
}

let btnAdd=document.getElementById('btnAdd')

btnAdd.addEventListener('click',function(event) {
    let txtTaskName=document.getElementById('txtTaskName')
    let lastnumber=datas.length;
    tasksAdd(lastnumber,txtTaskName.value)
    event.preventDefault();
})