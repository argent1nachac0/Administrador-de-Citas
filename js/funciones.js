import Citas from './clases/citas.js'
import UI from './clases/UI.js'
import {
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario
} from './selectores.js'

const ui = new UI()
const administrarCitas = new Citas()

let editando = false

//Objetos
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

export function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}
export function nuevaCita(e){
    e.preventDefault()

    //Extrar informacion del objeto de cita

    const { mascota,propietario,telefono,fecha,hora,sintomas} = citaObj

    //validar 
    if ( mascota === ''|| propietario === '' || telefono === '' || fecha === '' || hora=== '' || sintomas === '' ){
        
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return
    }

    if(editando){
        ui.imprimirAlerta('Editado Correctamente')

        //Pasar objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj})

        //Regresar texto de boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita'
        
        //Quitar modo edicion
        editando = false
    }else{
        //Generar ID unico
        citaObj.id = Date.now()

        //Crear una nueva cita
        administrarCitas.agregarCita({...citaObj})

        //Mensaje agregado correcamente
        ui.imprimirAlerta('Agregado Correctamente')
    }
    

    //Reinica el objeto para la validacion
    reiniciarObjeto()

    //Reinicia el form
    formulario.reset()

    //Mostrar citas en HTML
    ui.imprimirCitas(administrarCitas)

}

export function reiniciarObjeto(){
    citaObj.mascota = ''
    citaObj.propietario = ''
    citaObj.telefono = ''
    citaObj.fecha = ''
    citaObj.hora = ''
    citaObj.sintomas = ''
}

export function eliminarCita(id){
    //Eliminar la cita
    administrarCitas.eliminarCita(id)

    //Mostrar mensaje de eliminacion
    ui.imprimirAlerta('La cita se elimino correctamente')

    //Resfrezcar cita
    ui.imprimirCitas(administrarCitas)
}

export function cargarEdicion(cita){

    const { mascota,propietario,telefono,fecha,hora,sintomas ,id} = cita

    //Llenar los inputs
    mascotaInput.value = mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    fechaInput.value = fecha
    horaInput.value = hora
    sintomasInput.value = sintomas

    //Llenar objeto
    citaObj.mascota = mascota
    citaObj.propietario = propietario
    citaObj.telefono = telefono
    citaObj.fecha = fecha
    citaObj.hora = hora
    citaObj.sintomas = sintomas
    citaObj.id = id

    //Cambiar texto boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios'

    editando = true

}