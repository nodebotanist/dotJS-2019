const WebSocket = require('ws')

const socketServer = new WebSocket.Server({
	port: 8081
}) 

socketServer.on('connection', (ws) => {
	console.log('Connection established')

	ws.on('message', (message) => {
		console.log(`recieved: ${message}`)

		if(message === `startSong`) {
			console.log('startSong!')
			setTimeout(() => {
				broadcast(socketServer, 'four')
			}, 1000)
			setTimeout(() => {
				broadcast(socketServer, 'three')
			}, 2000)
			setTimeout(() => {
				broadcast(socketServer, 'two')
			}, 3000)
			setTimeout(() => {
				broadcast(socketServer, 'one')
			}, 4000)
			setTimeout(() => {
				console.log('startPlaying!')
				broadcast(socketServer, 'startPlaying')
			}, 5000)
		}
	})
})

function broadcast(ws, data){
	ws.clients.forEach(function each(client) {
		if (client !== ws && client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
}