 // Chatbot functionality
 document.addEventListener('DOMContentLoaded', function () {
 const chatbotIcon = document.getElementById('chatbotIcon');
 const chatbotWindow = document.getElementById('chatbotWindow');
 const closeChatbot = document.getElementById('closeChatbot');
 const chatbotMessages = document.getElementById('chatbotMessages');
 
 function addMessage(text, sender) {
     const messageDiv = document.createElement('div');
     messageDiv.classList.add('message', sender + '-message');
     messageDiv.textContent = text;
     chatbotMessages.appendChild(messageDiv);
     chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
 }
 
 function addOptions(options) {
     const optionsContainer = document.createElement('div');
     optionsContainer.classList.add('options-container');
     
     options.forEach(option => {
         const optionBtn = document.createElement('button');
         optionBtn.classList.add('option-btn');
         optionBtn.textContent = option.text;
         optionBtn.addEventListener('click', function() {
             addMessage(option.text, 'user');
             optionsContainer.remove();
             option.action();
         });
         optionsContainer.appendChild(optionBtn);
     });
     
     chatbotMessages.appendChild(optionsContainer);
     chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
 }
 
 function showInitialOptions() {
     addMessage("Hello! I'm your DevServices assistant. How can I help you today?", 'bot');
     
     const initialOptions = [
         {
             text: "Website Development",
             action: function() {
                 addMessage("We offer custom website development services.", 'bot');
                 showNextSteps('Website Development');
             }
         },
         {
             text: "Mobile App Development",
             action: function() {
                 addMessage("We build native and cross-platform mobile apps.", 'bot');
                 showNextSteps('Mobile App Development');
             }
         },
         {
             text: "Custom Software Solutions",
             action: function() {
                 addMessage("We develop tailored software for your business needs.", 'bot');
                 showNextSteps('Custom Software Solutions');
             }
         }
     ];
     
     addOptions(initialOptions);
 }
 
 function showNextSteps(serviceType) {
     setTimeout(() => {
         addMessage("Would you like to:", 'bot');
         
         const nextOptions = [
            {
                text: "Get a quote",
                action: function() {
                    addMessage("Redirecting you to our contact page...", 'bot');
                    setTimeout(() => {
                        window.location.href = 'contact.html';
                    }, 5000); // 5000 ms = 5 seconds
                }
            },
             {
                 text: "See portfolio",
                 action: function() {
                     addMessage("Here are some of our projects in this category...", 'bot');
                     addMessage("1. Project A - Description\n2. Project B - Description", 'bot');
                     showInitialOptions();
                 }
             },
             {
                 text: "Start over",
                 action: showInitialOptions
             }
         ];
         
         addOptions(nextOptions);
     }, 500);
 }
 

 
 chatbotIcon.addEventListener('click', function() {
     chatbotWindow.style.display = 'flex';
     chatbotIcon.style.display = 'none';
     showInitialOptions();
 });
 
 closeChatbot.addEventListener('click', function() {
     chatbotWindow.style.display = 'none';
     chatbotIcon.style.display = 'flex';
     chatbotMessages.innerHTML = '';
 });
});