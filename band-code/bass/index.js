const midi = require('midi')
const tonal = require('tonal')
const color = require('color')

const OPC = require('./opc')

// Set up a new input.
const input = new midi.Input();

// Count the available input ports.
const portCount = input.getPortCount()

// set up OPC connection for Fadecandy
const opcClient = new OPC('localhost', 7890)
// set the number of pixels
const numPixels = 24 + 64 + 15
opcClient.setPixelCount(numPixels)

// Find the port with i2M musicport in it-- that's the port we want
let port

for(let i = 0; i < portCount; i++) {
  let portName = input.getPortName(i)
  console.log(i, portName)
  if (portName.indexOf('i2M musicport') !== -1) {
    port = i
  }
}
console.log(`Opening port: ${port}`)

let currentNote = null
let messageTime
let currentDelta

// Configure a callback.
input.on('message', (deltaTime, message) => {
  messageTime = Date.now()
  let note = tonal.Note.fromMidi(message[1])
  let negative = note.indexOf('-') !== -1
  let scale = Number.parseInt(note.charAt(note.length - 1), 10)
  if(scale < 4 && scale >= 0 && !negative && deltaTime > 0.075){
    // console.log(`m: ${message} d: ${deltaTime}`)
    // console.log(`Note: ${note}`)
    currentNote = note
    currentDelta = deltaTime
  }
});

setInterval(() => {
  console.log(currentNote, messageTime, currentDelta)
  if(Date.now() - messageTime >= 1000){
    currentNote = null
    messageTime = null
  }
}, 200)

setInterval(() => {
  if(currentNote) {
    noteToHue(currentNote)
  } else {
    clear()
  }
}, 200)

function noteToHue(note) {
  const noteArray = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  let multiplier = noteArray.indexOf(note.charAt(0)) + 1
  if(note.charAt(1) === 'b') {
    multiplier -= 0.5
  }
  console.log(multiplier)
  let hue = (256 / 8) * multiplier
  let currentColor = color({h: hue, s: 100, l:25})
  console.log(currentColor.red(), currentColor.green(), currentColor.blue())
  for(let i = 0; i < numPixels; i++) {
    opcClient.setPixel(i, Math.round(currentColor.red()), Math.round(currentColor.green()), Math.round(currentColor.blue()))
  }
  opcClient.writePixels()
}

function clear() {
  for (let i = 0; i < numPixels; i++) {
    opcClient.setPixel(i, 0, 0, 0)
  }
  opcClient.writePixels()
}
// Open the first available input port.
input.openPort(port);
