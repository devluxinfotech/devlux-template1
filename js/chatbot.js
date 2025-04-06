
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const discountModal = document.getElementById('discountModal');
    const closeModal = document.getElementById('closeModal');
    
    // Show modal after delay
    setTimeout(() => {
        discountModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }, 1000);
    
    // Close modal when clicking X button
    closeModal.addEventListener('click', closeModalHandler);
    
    // Close modal when clicking outside
    discountModal.addEventListener('click', function(e) {
        if (e.target === discountModal) {
            closeModalHandler();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && discountModal.style.display === 'flex') {
            closeModalHandler();
        }
    });
    
    function closeModalHandler() {
        discountModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    // Form validation
    const discountForm = document.getElementById('discountForm');
    const nameInput = document.getElementById('modalName');
    const emailInput = document.getElementById('modalEmail');
    const phoneInput = document.getElementById('modalPhone');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.style.display = 'block';
            return false;
        }
        nameError.style.display = 'none';
        return true;
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.style.display = 'block';
            return false;
        }
        emailError.style.display = 'none';
        return true;
    }
    
    function validatePhone() {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            phoneError.style.display = 'block';
            return false;
        }
        phoneError.style.display = 'none';
        return true;
    }
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    
    // Form submission
    discountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        
        if (isNameValid && isEmailValid && isPhoneValid) {
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim()
            };
            
            console.log('Form submitted:', formData);
            alert(`Thank you, ${formData.name}! Your 30% discount has been applied. We'll contact you shortly.`);
            
            closeModalHandler();
            discountForm.reset();
        }
    });
    
    // Chatbot functionality
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
                        showQuoteForm(serviceType);
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
    
    function showQuoteForm(serviceType) {
        addMessage("Please fill out this form to get a quote:", 'bot');
        
        const formHTML = `
            <form class="quote-form" id="quoteForm">
                <div class="form-row">
                    <div class="form-group">
                        <label>Your Name:</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Phone Number:</label>
                    <input type="tel" name="phone" required>
                </div>
                <div class="form-group">
                    <label>Service Needed:</label>
                    <select name="service" required>
                        <option value="${serviceType}" selected>${serviceType}</option>
                        <option value="Website Development">Website Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Custom Software Solutions">Custom Software Solutions</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group" id="otherServiceGroup" style="display:none;">
                    <label>Please specify:</label>
                    <input type="text" name="otherService">
                </div>
                <div class="form-group">
                    <label>Project Details:</label>
                    <textarea name="details" required></textarea>
                </div>
                <button type="submit">Submit Request</button>
            </form>
        `;
        
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot-message');
        messageDiv.innerHTML = formHTML;
        chatbotMessages.appendChild(messageDiv);
        
        const serviceSelect = messageDiv.querySelector('select[name="service"]');
        serviceSelect.addEventListener('change', function() {
            const otherServiceGroup = messageDiv.querySelector('#otherServiceGroup');
            otherServiceGroup.style.display = this.value === 'Other' ? 'block' : 'none';
        });
        
        const quoteForm = messageDiv.querySelector('#quoteForm');
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(quoteForm);
            const service = formData.get('service') === 'Other' 
                ? formData.get('otherService') || 'Other Service'
                : formData.get('service');
            
            addMessage(`Thank you! Your quote request for ${service} has been received.`, 'bot');
            setTimeout(showInitialOptions, 2000);
        });
        
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
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
