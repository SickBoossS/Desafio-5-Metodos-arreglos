const tareas=[
    {id:1, tarea:"Salir a correr", estado:false},
    {id:2, tarea:"Invertir en cripto", estado:true},
    {id:3, tarea:"Leer Libro", estado:false}
]

function actualizaListado(){
    const listado = document.querySelector("tbody")
    const textTotal = document.querySelector("#total")
    const textRealizada= document.querySelector("#realizadas")

    //Actualiza Cantidad
    textTotal.innerHTML = `Total : ${tareas.length}`

    //Actualiza tareas realizadas
    let tareasAprobadas = tareas.filter(x => x.estado === true)
    textRealizada.innerHTML = `Realizadas : ${tareasAprobadas.length}`

    //Actualiza tabla de tareas
    let html = ""
    for (let tarea of tareas){
        let check = tarea.estado?"checked":""
        let nombreEstado = tarea.estado?"Cerrado":"Abierto"
        html += `
            <tr>
                <td>${tarea.id}</td>
                <td>${tarea.tarea}</td>
                <td> <input type="checkbox" onclick="actualizaEstado(${tarea.id})" ${check} >${nombreEstado}</td>
                <td><button class="eliminar" onclick="eliminar(${tarea.id})">x</button></td>
            </tr>
        `
    }
    listado.innerHTML = html
}

/* 
** Funcion que actualiza el estado
*/
function actualizaEstado(identificador){
    const tareaEncontrada = tareas.find( tarea => tarea.id === identificador)
    tareaEncontrada.estado = !tareaEncontrada.estado
    actualizaListado()
}

function eliminar(identificador){
    const tareaEncontrada = tareas.findIndex( tarea => tarea.id === identificador)
    tareas.splice(tareaEncontrada,1)
    actualizaListado()
    // console.log(tareaEncontrada)

}

function agregar(){
    const nombreTarea = document.querySelector("#inputTarea")
    
    //Genero el ID que se insertará
    let tamano = (tareas.length >0)? tareas.length:0
    let nuevoId = 0
    nuevoId = (tareas.length >0)? tareas[tamano-1].id:0
    nuevoId++

    // Inserto dato en el array
    if  (nombreTarea.value===""){
        window.alert("Ingrese una tarea.")
    }
    else{
        const nuevaTarea = {id:nuevoId, tarea:nombreTarea.value, estado:false}
        tareas.push(nuevaTarea)
        actualizaListado();
        nombreTarea.value=""
    }
}
actualizaListado()