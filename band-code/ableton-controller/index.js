const WebSocket = require('ws')

const Launchpad = require("./node-launchpad-mk2/src/index")

const maestroSocket = new WebSocket('ws://localhost:8081')

maestroSocket.on('open', () => {
	console.log('maestro socket open')
})

let myLaunchpad = new Launchpad({})

myLaunchpad.on("press", pressInfo => {
	if(pressInfo.button) console.log(pressInfo.button.note, pressInfo.button.x, pressInfo.button.y, pressInfo.velocity)
	else console.log(pressInfo)
	if(pressInfo.button && pressInfo.button.note === 69) {
		console.log('starting song')
		maestroSocket.send('startSong')
	}
})

myLaunchpad.on("release", button => {
	console.log(button.note, button.x, button.y)
})

myLaunchpad.buttons.forEach((button) => {
	button.setColor(button.note)
})