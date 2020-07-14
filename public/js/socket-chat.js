var socket = io();

var params = new URLSearchParams(window.location.search); // funcion para obtener params

if(!params.has('nombre') || !params.has('sala')) { // el nombre de usuario
    
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = { // lo paso al socket.emit
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function( resp ){ // si el servidor me acepta disparo un callback
        console.log('Usuarios conectados' , resp)
    })

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/*socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});*/

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchar cuando un usuario entra o sale del chat

socket.on('listPersona', function(personas) {

    console.log(personas);

});

// Mensaje privados , accion del cliente de escuchar un mensaje privado
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado: ', mensaje)
});