const socket=io('http://localhost:8000');

//Getting Dom elemets in js variables
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInput');
const messageContainer=document.querySelector('.container');
//audio that will be played
var audio=new Audio('ting.mp3')
//append function will append the event information to the container
const append=(message, position)=>{
const msgEle=document.createElement('div');
msgEle.innerText=message;
msgEle.classList.add('message');
msgEle.classList.add(position );
messageContainer.append(msgEle);

if(position !='right'){
   audio.play();
}
}


//Ask the user to feed his name and let the server know via new-user-joined event
const name=prompt('Enter your name to join the chat');
socket.emit('new-user-joined', name);


//If a user has joined. Receive its name from the server
socket.on('user-joined', name=>{
   append(`${name} joined the chat`,'center');
}) 


//If the server sends a message, receive it
socket.on('receive', data=>{
   append(`${data.name}: ${data.message} `,'left');
}) 


//if a user leaves the chat, append the info in the container
socket.on('user-left', name=>{
  append(`${name} left the chat`, 'center')
})

//if the form gets submitted, send the server a message
form.addEventListener('submit', (e)=>{
   e.preventDefault();
   const message= messageInput.value;
   append(`You: ${message}`,'right');
   socket.emit('send', message);
   messageInput.value=' ';
   })