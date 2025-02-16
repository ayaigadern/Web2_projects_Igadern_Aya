//to do
document.querySelector("form.add input").addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        let to_add = this.value.trim(); 

        if (to_add === "") return;

        let element_li = document.createElement("li");
        element_li.className = "list-group-item d-flex justify-content-between align-items-center";

        let element_span = document.createElement("span");
        element_span.innerText = to_add;

        let element_i = document.createElement("i");
        element_i.className = "far fa-trash-alt delete";
        element_i.addEventListener("click", function() {
            element_li.remove();
        });

        element_li.appendChild(element_span);
        element_li.appendChild(element_i);
        document.querySelector(".list-group").appendChild(element_li);
        this.value = "";
    }
});

const deleteIcons = document.querySelectorAll('.far.fa-trash-alt.delete');

deleteIcons.forEach(function(icon) {
    icon.addEventListener('click', function() {
        const parentLi = icon.closest('li');
        parentLi.remove();
    });
});
//filtrer
document.querySelector("form.search input").addEventListener("input",function(){
    let filtre=this.value.toLowerCase().trim();
    let todos=document.querySelectorAll(".list-group-item");

todos.forEach(todo=>{
    let task=todo.querySelector("span").innerText.toLowerCase();
    if(task.includes(filtre)){
        todo.style.display="flex";
    }
    else{
        todo.style.setProperty("display", "none", "important");
    }
});
});





