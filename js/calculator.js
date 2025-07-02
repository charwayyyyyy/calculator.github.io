// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.calculator-3d').appendChild(renderer.domElement);

// Create floating particles
const particles = [];
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const geometry = new THREE.SphereGeometry(0.1, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xff9f0a, transparent: true, opacity: 0.5 });
    const particle = new THREE.Mesh(geometry, material);
    
    particle.position.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
    );
    
    particles.push(particle);
    scene.add(particle);
}

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    particles.forEach(particle => {
        particle.position.y += 0.01;
        if (particle.position.y > 10) particle.position.y = -10;
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
    });
    
    renderer.render(scene, camera);
}

animate();

// Calculator Class
class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
        this.shouldResetScreen = false;
        
        this.display = {
            previous: document.querySelector('.previous-operand'),
            current: document.querySelector('.current-operand')
        };
        
        this.bindEvents();
    }
    
    bindEvents() {
        document.querySelectorAll('.number').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.innerText);
                this.animateButton(button);
            });
        });
        
        document.querySelectorAll('.operator').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                this.handleOperation(action);
                this.animateButton(button);
            });
        });
    }
    
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.shouldResetScreen) {
            this.currentOperand = number;
            this.shouldResetScreen = false;
        } else {
            this.currentOperand = this.currentOperand === '0' ? number : this.currentOperand + number;
        }
        this.updateDisplay();
    }
    
    handleOperation(action) {
        switch(action) {
            case 'clear':
                this.clear();
                break;
            case 'plusMinus':
                this.toggleSign();
                break;
            case 'percentage':
                this.percentage();
                break;
            case 'equals':
                this.compute();
                break;
            default:
                if (this.operation && !this.shouldResetScreen) {
                    this.compute();
                }
                this.operation = action;
                this.previousOperand = this.currentOperand;
                this.shouldResetScreen = true;
                break;
        }
        this.updateDisplay();
    }
    
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }
    
    toggleSign() {
        this.currentOperand = String(-parseFloat(this.currentOperand));
    }
    
    percentage() {
        this.currentOperand = String(parseFloat(this.currentOperand) / 100);
    }
    
    compute() {
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch(this.operation) {
            case 'add':
                this.currentOperand = String(prev + current);
                break;
            case 'subtract':
                this.currentOperand = String(prev - current);
                break;
            case 'multiply':
                this.currentOperand = String(prev * current);
                break;
            case 'divide':
                this.currentOperand = current !== 0 ? String(prev / current) : 'Error';
                break;
        }
        
        this.operation = undefined;
        this.previousOperand = '';
    }
    
    updateDisplay() {
        this.display.current.textContent = this.currentOperand;
        if (this.operation) {
            const operationSymbols = {
                add: '+',
                subtract: '−',
                multiply: '×',
                divide: '÷'
            };
            this.display.previous.textContent = `${this.previousOperand} ${operationSymbols[this.operation]}`;
        } else {
            this.display.previous.textContent = '';
        }
    }
    
    animateButton(button) {
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            onComplete: () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.1
                });
            }
        });
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        button.appendChild(ripple);
        
        gsap.to(ripple, {
            scale: 1.5,
            opacity: 0,
            duration: 0.6,
            onComplete: () => ripple.remove()
        });
    }
}

// Initialize calculator
const calculator = new Calculator();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});