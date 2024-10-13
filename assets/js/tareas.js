const listaDeTareas = document.querySelector("#tareas");
const tareasInput = document.querySelector("#nuevaTarea");
const btnAgregar = document.querySelector("#AgregarTarea");
const cuentaTareas = document.querySelector("#cuentaTareas");
const cuentaTareasCompletadas = document.querySelector("#cuentaTareasCompletadas");  


const tareas = [
    { id: 1, nombre: "Estudiar JavaScript", completado: false },
    { id: 2, nombre: "Leer sobre APIs REST", completado: false },
    { id: 3, nombre: "Practicar ejercicios de CSS", completado: true }
];


const renderTareas = () => {
    let html = tareas.map(tarea => 
        `<li>
            <input type="checkbox" ${tarea.completado ? 'checked' : ''} onchange="cambiarCompletado(${tarea.id})"> 
            <span style="text-decoration: ${tarea.completado ? 'line-through' : 'none'}">
                ${tarea.nombre}
            </span>
            <button onclick="borrar(${tarea.id})" class="boton">❌</button>
        </li>`
    ).join("");
    
    listaDeTareas.innerHTML = html;
    cuentaTareas.innerHTML = tareas.length;


    const completadas = tareas.filter(tarea => tarea.completado).length; 
    cuentaTareasCompletadas.innerHTML = completadas;  
}


btnAgregar.addEventListener("click", () => {
    const nuevaTarea = tareasInput.value.trim();
    
    if (nuevaTarea) {
        tareas.push({ id: Date.now(), nombre: nuevaTarea, completado: false }); 
        tareasInput.value = "";
        renderTareas(); 
    }
});


function borrar(id) {
    const index = tareas.findIndex(tarea => tarea.id === id);
    
    if (index !== -1) {
        tareas.splice(index, 1); 
        renderTareas(); 
    }
}


function cambiarCompletado(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completado = !tarea.completado;  
        renderTareas();  
    }
}

renderTareas();

