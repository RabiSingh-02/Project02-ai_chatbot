var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');
var user = {
    message:""
};


function sendMessage(userMessage){
    var messageElement = document.createElement('div');
    messageElement.classList.add("message", "user-message");
    messageElement.innerText = userMessage;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

textbox.addEventListener("keypress", function(e){
    if (e.key === "Enter"){
        e.preventDefault();
        sendBtn.click();
    }
});


function chatbotResponse(reply){
    var messageElement = document.createElement('div');

    messageElement.classList.add("message", "bot-message");
    messageElement.innerText=reply;

    chatContainer.appendChild(messageElement);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}


function showThinking(){
    var thinkingElement = document.createElement('div');
    thinkingElement.classList.add("message", "bot-message");

    thinkingElement.innerHTML = `
    <span>Chatbot:</span>
    <span class = "dot"></span>
    <span class = "dot"></span>
    <span class = "dot"></span>
    `;

    chatContainer.appendChild(thinkingElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return thinkingElement;
}

sendBtn.addEventListener('click', async function(e){
    var userMessage = textbox.value;
    
    if(userMessage == ""){
        alert('Please Enter A Text');
    }else{
        let userMessageText = userMessage.trim();
        textbox.value = "";
        sendMessage(userMessageText);
        const thinking = showThinking();
        try{
            const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: userMessageText})
        });
        const data = await response.json();
        thinking.remove();
        chatbotResponse(data.reply);
        } catch(error) {
            thinking.remove();
            chatbotResponse("Error In Getting Response");
        }
    
    }
});