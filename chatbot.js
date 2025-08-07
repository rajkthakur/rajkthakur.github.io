// AI Assistant for Raj Thakur's Portfolio
class SystemDesignAssistant {
    constructor() {
        this.knowledge = {
            personal: {
                name: "Raj Thakur",
                role: "Senior ML Engineer at Amazon",
                experience: "10+ years in ML infrastructure, PyTorch/JAX optimization, AWS Trainium & Inferentia",
                specialties: ["ML Acceleration", "Custom Silicon", "Distributed Training", "System Design"]
            },
            aws: {
                current: "Senior SDE focusing on PyTorch/JAX optimization for AWS Trainium & Inferentia",
                achievements: ["1.2x faster training performance", "PJRT backend development", "$200M+ FCF benefits"],
                duration: "5+ years at AWS across multiple roles"
            },
            publication: {
                name: "Software System Design",
                url: "https://medium.com/software-system-design",
                focus: "Scalable architecture, distributed systems, production ML systems",
                role: "Editor and contributor"
            },
            topics: {
                "system design": "I write about scalable architectures, distributed systems, and ML infrastructure",
                "aws trainium": "Custom silicon for ML training - I optimize PyTorch/JAX for these chips",
                "pytorch": "Deep learning framework I specialize in optimizing for custom hardware",
                "ml acceleration": "My expertise in making ML training and inference faster on specialized hardware",
                "opensearch": "Worked on this distributed search engine during my AWS SDE II role"
            }
        };
        
        this.responses = {
            greeting: [
                "Hi! I'm Raj's AI assistant. Ask me about his ML engineering experience, AWS work, or System Design publication! 🤖",
                "Hello! I can tell you about Raj's expertise in ML acceleration, AWS Trainium, or his technical writing. What interests you?",
                "Hey there! Want to know about Raj's work on PyTorch optimization, system design, or his Medium publication?"
            ],
            fallback: [
                "That's an interesting question! You might find more details in Raj's Medium articles or LinkedIn profile.",
                "I'd recommend checking out Raj's System Design publication on Medium for in-depth technical content!",
                "For specific technical details, Raj's blog posts would be the best resource. Check out his Medium profile!"
            ]
        };
        
        this.isOpen = false;
        this.init();
    }
    
    init() {
        this.createChatWidget();
        this.bindEvents();
    }
    
    createChatWidget() {
        const chatHTML = `
            <div id="ai-assistant" class="chat-widget">
                <div class="chat-toggle" id="chatToggle">
                    <span class="chat-icon">🤖</span>
                    <span class="chat-text">Ask about Raj</span>
                </div>
                <div class="chat-container" id="chatContainer">
                    <div class="chat-header">
                        <div class="chat-title">
                            <span>🤖</span>
                            <span>System Design Assistant</span>
                        </div>
                        <button class="chat-close" id="chatClose">×</button>
                    </div>
                    <div class="chat-messages" id="chatMessages">
                        <div class="message bot-message">
                            ${this.getRandomResponse('greeting')}
                        </div>
                    </div>
                    <div class="chat-input-container">
                        <input type="text" id="chatInput" placeholder="Ask about ML engineering, AWS, system design..." maxlength="200">
                        <button id="chatSend">Send</button>
                    </div>
                    <div class="quick-questions">
                        <button class="quick-btn" data-question="What is Raj's experience with AWS Trainium?">AWS Trainium</button>
                        <button class="quick-btn" data-question="Tell me about the System Design publication">Publication</button>
                        <button class="quick-btn" data-question="What are Raj's ML specialties?">ML Skills</button>
                    </div>
                </div>
            </div>
        `;
        
       // document.body.insertAdjacentHTML('beforeend', chatHTML);
    }
    
    bindEvents() {
        const toggle = document.getElementById('chatToggle');
        const close = document.getElementById('chatClose');
        const send = document.getElementById('chatSend');
        const input = document.getElementById('chatInput');
        const quickBtns = document.querySelectorAll('.quick-btn');
        
        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.closeChat());
        send.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question;
                this.handleUserMessage(question);
            });
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        const container = document.getElementById('chatContainer');
        const toggle = document.getElementById('chatToggle');
        
        if (this.isOpen) {
            container.style.display = 'flex';
            toggle.style.display = 'none';
        } else {
            container.style.display = 'none';
            toggle.style.display = 'flex';
        }
    }
    
    closeChat() {
        this.isOpen = false;
        document.getElementById('chatContainer').style.display = 'none';
        document.getElementById('chatToggle').style.display = 'flex';
    }
    
    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (message) {
            this.handleUserMessage(message);
            input.value = '';
        }
    }
    
    handleUserMessage(message) {
        this.addMessage(message, 'user');
        
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 500);
    }
    
    addMessage(text, type) {
        const messages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = text;
        
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }
    
    generateResponse(message) {
        const msg = message.toLowerCase();
        
        // AWS Trainium/Inferentia
        if (msg.includes('trainium') || msg.includes('inferentia')) {
            return "Raj specializes in ML acceleration on AWS Trainium (training) and Inferentia (inference) chips. He's developed PJRT backends and achieved 1.2x faster PyTorch training performance!";
        }
        
        // PyTorch/JAX
        if (msg.includes('pytorch') || msg.includes('jax')) {
            return "Raj is an expert in PyTorch and JAX optimization for custom silicon. He works on XLA integration, native PyTorch development, and HLO-based graph optimizations.";
        }
        
        // System Design Publication
        if (msg.includes('publication') || msg.includes('medium') || msg.includes('system design')) {
            return "Raj edits the 'Software System Design' publication on Medium, focusing on scalable architectures and distributed systems. Check it out at medium.com/software-system-design!";
        }
        
        // AWS Experience
        if (msg.includes('aws') || msg.includes('amazon')) {
            return "Raj has 5+ years at AWS across multiple roles - from OpenSearch development to ML acceleration. He's contributed to $200M+ in free cash flow benefits!";
        }
        
        // ML/AI
        if (msg.includes('ml') || msg.includes('machine learning') || msg.includes('ai')) {
            return "Raj specializes in ML frameworks optimization, distributed training, and custom silicon acceleration. His expertise spans PyTorch, JAX, and production ML systems.";
        }
        
        // Experience/Background
        if (msg.includes('experience') || msg.includes('background') || msg.includes('career')) {
            return "Raj has 10+ years in software engineering, with experience at Amazon, Grab, and TCS. He's evolved from full-stack development to specialized ML infrastructure.";
        }
        
        // Skills
        if (msg.includes('skill') || msg.includes('expertise') || msg.includes('specialt')) {
            return "Raj's key skills: ML Acceleration, PyTorch/JAX optimization, AWS Trainium/Inferentia, Distributed Systems, System Design, and Technical Writing.";
        }
        
        return this.getRandomResponse('fallback');
    }
    
    getRandomResponse(type) {
        const responses = this.responses[type];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SystemDesignAssistant();
});
