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
				ws.send('four')
			}, 1000)
			setTimeout(() => {
				ws.send('three')
			}, 2000)
			setTimeout(() => {
				ws.send('two')
			}, 3000)
			setTimeout(() => {
				ws.send('one')
			}, 4000)
			setTimeout(() => {
				console.log('startPlaying!')
				ws.send('startPlaying')
			}, 5000)
		}
	})
})