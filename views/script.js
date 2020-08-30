const udp = require('dgram');
const buffer = require('buffer');
const net = require('net');
const fs = require('fs');
const path = require('path');

function loadTemplate(name) {

  var file = JSON.parse(fs.readFileSync(path.join(__dirname, `../templates/${name}`)).toString());
  document.getElementById('input').value = file.body;
  document.getElementById('ip').value = file.ip;
  document.getElementById('port').value = file.port;
  document.getElementById('protocol').value = file.protocol;

}

function sendUDP() {

  var client = udp.createSocket('udp4');
  var data = Buffer.from(document.getElementById('input').value);

  client.on('message',function(msg,info){

    document.getElementById('output').value = document.getElementById('output').value + msg.toString();

  });

  client.send(data, document.getElementById('port').value, document.getElementById('ip').value, function(error) {

    if (error) return client.close();
    alert("sent");

  });

}

function sendTCP() {

  var client = new net.Socket();

  client.connect(document.getElementById('port').value, document.getElementById('ip').value, function() {

    client.write(document.getElementById('input').value);
    alert("sent");

  });

  client.on('data', function(data) {

  	document.getElementById('output').value = document.getElementById('output').value + data.toString();

  });

  client.on('close', function() {

  	document.getElementById('output').value = document.getElementById('output').value + "###ENDCONNECTION###";

  });

}

function send() {

  document.getElementById('output').value = "";

  if (document.getElementById("protocol").value == "UDP") {

    sendUDP();

  } else {

    sendTCP();

  }

}
