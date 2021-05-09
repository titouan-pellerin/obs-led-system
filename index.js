const Readline = require('@serialport/parser-readline');
const SerialPort = require('serialport')
const port = new SerialPort('COM3', { baudRate: 9600 })

const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();
const parser = port.pipe(new Readline({ delimiter: '\n' }));

// Read the port data
port.on("open", () => {
  console.log('serial port open');
});
parser.on('data', data =>{
  console.log('got word from arduino:', data);
});


// Declare some events to listen for.
obs.on('ConnectionOpened', () => {
  console.log('Connection Opened');

  // Send some requests.
  obs.sendCallback('GetSceneList', {}, (err, data) => {
    console.log('Using callbacks:', err, data);
  });

  obs.send('GetSceneList').then(data => {
    console.log('Using promises:', data);
  });
});

obs.on('SwitchScenes', data => {
  //console.log('SwitchScenes', data);
  port.write(data['scene-name'],  function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log(data['scene-name'])
    
  });
  //console.log(data['scene-name']);

});



obs.connect({ address: 'localhost:4444', password: 'visufo' });






