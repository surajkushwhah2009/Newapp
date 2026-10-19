

const socket = io(); 
const form = document.querySelector('#send-container'); 
const messageInput = document.querySelector('.input'); 
const messageContainer = document.querySelector('.container'); 

// यूजर से उसका नाम पूछना
let name = prompt("Enter your name:");

// अगर यूजर ने नाम नहीं डाला या कैंसिल कर दिया, तो डिफ़ॉल्ट नाम देना
if (!name || name.trim() === "") {
    name = "Anonymous User";
}

function append(message, position) {   
    const messageElement = document.createElement('div');   
    messageElement.classList.add('massage', position);   
    messageElement.innerText = message;   
    messageContainer.appendChild(messageElement); 
}

// Server को बताना कि नया यूजर जॉइन हुआ है
socket.emit('new-joined-user', name); 

// जब कोई दूसरा यूजर चैट जॉइन करे
socket.on('joined-user', (userName) => {   
    append(`${userName}: joined the chat`, 'left'); 
});

// दूसरे यूजर का मैसेज रिसीव करना
socket.on('receive', (data) => {   
    append(`${data.name}: ${data.message}`, 'left'); 
});

// जब कोई यूजर चैट छोड़कर जाए
socket.on('left', (name) => {   
    append(`${name} left the chat`, 'left');
});

// फॉर्म सबमिट होने पर मैसेज भेजना
form.addEventListener('submit', (e) => {    
    e.preventDefault();    
    const message = messageInput.value;    
    if (message.trim() !== "") {
        append(`You: ${message}`, 'right');    
        socket.emit('send', message);    
        messageInput.value = ''; 
    }
});


/*const socket = io();

const form = document.querySelector('#send-container');
const messageInput = document.querySelector('.input');
const messageContainer = document.querySelector('.container');

const name = prompt("inter your name")

function append(message, position) {
  const messageElement = document.createElement('div');

  messageElement.classList.add('massage', position);
  messageElement.innerText = message;

  messageContainer.appendChild(messageElement);

  
}

// Server ko batana ki naya user join hua
socket.emit('new-joined-user', name);

// Doosra user join kare
socket.on('joined-user', (userName) => {
  append(`${userName} joined the chat`, 'right');
});



// Doosre user ka message receive karna
socket.on('receive', (data) => {
  append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name =>{
  append(`${name}: left the chat`,'left')
})

form.addEventListener('submit',(e)=>{
   e.preventDefault();
   const message = messageInput.value;
   append(`You: ${message}`,'right')
   socket.emit('send',message)
   messageInput.value = '';
})

*/
