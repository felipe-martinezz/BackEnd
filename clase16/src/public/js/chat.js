const socket = io();

let user;

const chatBox = document.getElementById("chat");

swal.fire({
    title:"Decinos tu mail para ingresar al chat",
    input:"text",
    inputValidator: (value) =>{
        return !value || !value.includes("@") && "Necesitamos tu mail para continuar"
    },
    allowOutsideClick:false,
    allowEscapeKey: false,
}).then(result=>{
    user = result.value;
})

/*Eventos*/
chatBox.addEventListener('keyup',e=>{
    if(e.key === 'Enter'){
        if(chatBox.value.trim().length>0){
            let date = new Date()
            let dateString = date.toLocaleDateString()
            socket.emit('message',{user: user,message: chatBox.value, date: dateString})
            chatBox.value="";
        }
    }
})

socket.on('chatMessages',(data) =>{
    let chatMessages = document.getElementById("data");
    let messages = "";
    data.forEach(message => {
        messages = messages + `<span>${message.date}</span>${message.user}:${message.message}</br>`
    });
    chatMessages.innerHTML = messages;

    
})