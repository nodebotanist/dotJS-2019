const midi = require('midi');
const tonal = require('tonal')

// Set up a new input.
const input = new midi.Input();

// Count the available input ports.
const portCount = input.getPortCount()

// Get the name of a specified input port.
for(let i = 0; i < portCount; i++) {
  console.log(i, input.getPortName(i))
}

// Configure a callback.
input.on('message', (deltaTime, message) => {
  // The message is an array of numbers corresponding to the MIDI bytes:
  //   [status, data1, data2]
  // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
  // information interpreting the messages.
  let note = tonal.Note.fromMidi(message[1])
  let scale = Number.parseInt(note.charAt(note.length - 1), 10)
  if(scale < 4 && scale >= 0 && deltaTime > 0.5){
    console.log(`m: ${message} d: ${deltaTime}`)
    console.log(`Note: ${note}`)
  }
});

// Open the first available input port.
input.openPort(0);
