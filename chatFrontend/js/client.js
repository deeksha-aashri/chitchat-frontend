const socket=io('http://localhost:8000');


const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInput');
const messageContainer=document.querySelector('.container');

var audio=new Audio('ting.mp3')

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

form.addEventListener('submit', (e)=>{
e.preventDefault();
const message= messageInput.value;
append(`You: ${message}`,'right');
socket.emit('send', message);
messageInput.value=' ';
})

const name=prompt('Enter your name to join the chat');
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
   append(`${name} joined the chat`,'center');
}) 

socket.on('receive', data=>{
   append(`${data.name}: ${data.message} `,'left');
}) 

socket.on('user-left', name=>{
  append(`${name} left the chat`, 'center')
})


 