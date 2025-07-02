import { gsap } from 'gsap';

type Operation = 'add' | 'subtract' | 'multiply' | 'divide' | 'percentage';

interface CalculatorDisplay {
  previous: HTMLElement;
  current: HTMLElement;
}

interface OperationSymbols {
  [key: string]: string;
}

export class Calculator {
  private previousOperand: string = '';
  private currentOperand: string = '0';
  private operation?: Operation;
  private shouldResetScreen: boolean = false;
  private display: CalculatorDisplay;
  private readonly operationSymbols: OperationSymbols = {
    add: '+',
    subtract: '−',
    multiply: '×',
    divide: '÷'
  };

  constructor() {
    this.display = {
      previous: document.querySelector('.previous-operand') as HTMLElement,
      current: document.querySelector('.current-operand') as HTMLElement
    };
    this.bindEvents();
  }

  private bindEvents(): void {
    // Button clicks
    document.querySelectorAll('.number').forEach(button => {
      button.addEventListener('click', () => {
        this.appendNumber(button.textContent || '');
        this.animateButton(button as HTMLElement);
      });
    });

    document.querySelectorAll('.operator').forEach(button => {
      button.addEventListener('click', () => {
        const action = (button as HTMLElement).dataset.action;
        if (action) this.handleOperation(action);
        this.animateButton(button as HTMLElement);
      });
    });

    // Keyboard support
    document.addEventListener('keydown', this.handleKeyboard.bind(this));
  }

  private handleKeyboard(event: KeyboardEvent): void {
    event.preventDefault();

    const key = event.key;
    const button = this.findButtonByKey(key);

    if (button) {
      button.click();
      this.animateButton(button);
    }
  }

  private findButtonByKey(key: string): HTMLElement | null {
    const keyMap: { [key: string]: string } = {
      Enter: 'equals',
      '=': 'equals',
      Escape: 'clear',
      Backspace: 'clear',
      '/': 'divide',
      '*': 'multiply',
      '-': 'subtract',
      '+': 'add',
      '%': 'percentage'
    };

    if (key.match(/[0-9.]/)) {
      return document.querySelector(`button.number:not([data-action]):contains(${key})`);
    }

    const action = keyMap[key];
    return action ? document.querySelector(`button[data-action="${action}"]`) : null;
  }

  private appendNumber(number: string): void {
    try {
      if (number === '.' && this.currentOperand.includes('.')) return;
      
      if (this.shouldResetScreen) {
        this.currentOperand = number;
        this.shouldResetScreen = false;
      } else {
        this.currentOperand = this.currentOperand === '0' ? number : this.currentOperand + number;
      }
      
      this.updateDisplay();
    } catch (error) {
      console.error('Error appending number:', error);
      this.handleError('Invalid input');
    }
  }

  private handleOperation(action: string): void {
    try {
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
          this.operation = action as Operation;
          this.previousOperand = this.currentOperand;
          this.shouldResetScreen = true;
          break;
      }
      this.updateDisplay();
    } catch (error) {
      console.error('Error handling operation:', error);
      this.handleError('Invalid operation');
    }
  }

  private clear(): void {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
  }

  private toggleSign(): void {
    this.currentOperand = String(-parseFloat(this.currentOperand));
  }

  private percentage(): void {
    const num = parseFloat(this.currentOperand);
    if (!isNaN(num)) {
      this.currentOperand = String(num / 100);
    }
  }

  private async compute(): Promise<void> {
    try {
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);

      if (isNaN(prev) || isNaN(current)) return;

      const response = await fetch('calculate.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          num1: prev,
          num2: current,
          operation: this.operation
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      this.currentOperand = data.result;
      this.operation = undefined;
      this.previousOperand = '';
    } catch (error) {
      console.error('Calculation error:', error);
      this.handleError('Calculation error');
    }
  }

  private handleError(message: string): void {
    this.currentOperand = 'Error';
    this.updateDisplay();
    
    // Show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'calculator-error';
    errorDiv.textContent = message;
    document.querySelector('.calculator')?.appendChild(errorDiv);

    // Remove error message after 3 seconds
    setTimeout(() => {
      errorDiv.remove();
      if (this.currentOperand === 'Error') {
        this.clear();
        this.updateDisplay();
      }
    }, 3000);
  }

  private updateDisplay(): void {
    this.display.current.textContent = this.currentOperand;
    if (this.operation) {
      this.display.previous.textContent = 
        `${this.previousOperand} ${this.operationSymbols[this.operation]}`;
    } else {
      this.display.previous.textContent = '';
    }
  }

  private animateButton(button: HTMLElement): void {
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