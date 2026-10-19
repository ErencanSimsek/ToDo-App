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

btnAdd.addEventListener('click',function(event) {
    let txtTaskName=document.getElementById('txtTaskName').value
    let lastnumber=datas.length+1;
    datas.push({"id":lastnumber,"name":txtTaskName})
    tasksAdd()
    event.preventDefault();
})