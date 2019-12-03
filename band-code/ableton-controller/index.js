const WebSocket = require('ws')
const { createAudio } = require('node-mp3-player')

const Launchpad = require("./node-launchpad-mk2/src/index")

const maestroSocket = new WebSocket('ws://localhost:8081')

const Audio = createAudio()
let wark

maestroSocket.on('open', async () => {
	wark = await Audio(`${__dirname}/sounds/wark.mp3`)
	console.log('maestro socket open')
})

let myLaunchpad = new Launchpad({})

myLaunchpad.on("press", async pressInfo => {
	if(pressInfo.button) console.log(pressInfo.button.note, pressInfo.button.x, pressInfo.button.y, pressInfo.velocity)
	else console.log(pressInfo)
	if(pressInfo.button && pressInfo.button.note === 69) {
		console.log('starting song')
		maestroSocket.send('startSong')
	} else if (pressInfo.button && pressInfo.button.note === 49) {
		console.log('stopping song')
		maestroSocket.send('stopSong')
	} else if (pressInfo.button && pressInfo.button.note === 73) {
		console.log('playing wark!')
		playSound('wark')
	}
})

myLaunchpad.on("release", button => {
	console.log(button.note, button.x, button.y)
})

myLaunchpad.buttons.forEach((button) => {
	button.setColor(button.note)
})

async function playSound(name) {
	await wark.volume(1)
	await wark.play()
}