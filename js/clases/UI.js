import {eliminarCita,cargarEdicion} from '../funciones.js'
import {contenedorCitas, heading} from '../selectores.js'

class UI {

    imprimirAlerta(mensaje, tipo){
        
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center','alert','d-block','col-12')

        //agregar objeto en base al error

        if (tipo === 'error'){
            divMensaje.classList.add('alert-danger')
        }else{
            divMensaje.classList.add('alert-success')
        }

        //Mensaje error
        divMensaje.textContent = mensaje

        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje , document.querySelector('.agregar-cita'))

        //quitar la alerta en 5 seg

        setTimeout( ()=>{
            divMensaje.remove()
        },5000)
    }

    imprimirCitas({citas}){
        this.limpiarHTML()
        
        citas.forEach( cita => {
            const { mascota,propietario,telefono,fecha,hora,sintomas, id} = cita

            const divCita = document.createElement('div')
            divCita.classList.add('.cita', 'p-3')
            divCita.dataset.id = id

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2')
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder')
            mascotaParrafo.textContent = mascota

            const propietarioParrafo = document.createElement('p')
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `

            const telefonoParrafo = document.createElement('p')
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `

            const fechaParrafo = document.createElement('p')
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `

            const horaParrafo = document.createElement('p')
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora: </span> ${hora}
            `

            const sintomasParrafo = document.createElement('p')
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `

            //boton para elimianr citas

            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('btn','btn-danger','mr-2')
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            btnEliminar.onclick = () => eliminarCita(id)

            //Boton para modificar citas
            const btnModificar = document.createElement('button')
            btnModificar.classList.add('btn','btn-info')
            btnModificar.innerHTML = 'Modificar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            btnModificar.onclick =  () => cargarEdicion(cita)

            //Agregar parrafos al divCita
            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoParrafo)
            divCita.appendChild(fechaParrafo)
            divCita.appendChild(horaParrafo)
            divCita.appendChild(sintomasParrafo)
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnModificar)

            //Agregar HTML el divCita
            contenedorCitas.appendChild(divCita)
        })
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }

}

export default UI;