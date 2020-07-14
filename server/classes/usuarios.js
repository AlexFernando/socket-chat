
class Usuarios {

    constructor() {
        this.personas = []; // array de personas en el chat
    }

    agregarPersona(id, nombre, sala) { // crea una persona y lo agrega al array de personas
    
        let persona = {id, nombre, sala};
        
        this.personas.push(persona)

        return this.personas;
    } 

    getPersona( id ) {

        let persona = this.personas.filter( persona => persona.id === id)[0]; // el [0] es para que me regrese el primer valor que en encuentre

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala( sala ) {
        let personasEnSala = this.personas.filter( persona => persona.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        
        // asigno un nuevo arreglo (sin el id) a mi antiguo arreglo, nuevo arreglo con las personas activas en el chat
        this.personas = this.personas.filter( persona => persona.id != id)

        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}


