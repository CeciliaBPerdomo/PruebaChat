/* 
Realizar una aplicación basada en node.js, express y
websocket que permita generar un chat colaborativo entre usuarios conectados.
- Cada usuario podrá ingresar su nombre y mensaje a través de un formulario y enviar la
información utilizando el canal de websocket.
- Los mensajes serán presentados en tiempo real en cada uno de los clientes.
- Cuando un usuario nuevo se conecte, recibirá todos los mensajes hasta ahí
ingresados.
- Los mensajes persistirán en memoria del servidor.


npm init -y
npm i
npm install express socket.io

*/

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

let messages = []

app.use(express.static('public'))

io.on('connection', function(socket){
    console.log('Un cliente se ha conectado')
    /* Emitir todos los mensajes a un cliente nuevo */
    socket.emit('messages', messages)

    socket.on('new-message', function(data){
        /* Agregar mensajes a array */
        messages.push(data)

        /* Emitir a todos los clientes */ 
        io.sockets.emit('messages', messages)
    })
})

const PORT = process.env.PORT || 8080

const srv = server.listen(PORT, () => {
    console.log(`Servidor Http con WebSockets escuchando en el puerto ${srv.address().port}`)
})
srv.on('error', error => console.log(`Error en el servidor ${error}`))


/* 
1) en la terminal integrada: git init 
2) crear un archivo .gitignore
3) en .gitignore escribir: /node_modules
4) crear repositorio en git
5) clonar
6) en la terminal integrada git add . 
7) git commit -m "first commit"
8) git remote add origin https://github.com/CeciliaBPerdomo/PruebaChat.git
9) git push
10) git push --set-upstream origin master
*/
