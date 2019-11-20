const WebSocket = require('ws')

const socketServer = new WebSocket.Server({
	port: 8081
}) 

socketServer.on('connection', (ws) => {
	console.log('Connection established')

	ws.on('message', (message) => {
		console.log(`recieved: ${message}`)
	})
})