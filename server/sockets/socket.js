const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades')

const usuarios = new Usuarios(); // llamar a la clase


io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        
        console.log(data)

        if( !data.nombre  || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }
        
        client.join(data.sala);

        let personas = usuarios.agregarPersona( client.id, data.nombre, data.sala);

        // evento 
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${ data.nombre } se unió`));

        callback(usuarios.getPersonasPorSala(data.sala));
    })

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje( persona.nombre, data.mensaje );

        client.broadcast.to(persona.sala).emit( 'crearMensaje', mensaje);
    })

    client.on('disconnect', () => {
         // una persona se va del chat, e informar a todos

        let personaBorrada = usuarios.borrarPersona(client.id);
  // necesito disparar el evento de listas de personas porque se desconecto alguien
        // evento 
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } salió`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));


    });
    //Mensajes privados , lo que hara el server cuando alguien quiera mandar un mensaje privado a alguien
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
        //data.para es el id de la persona a la que yo quiero enviar un mensaje
    });
});