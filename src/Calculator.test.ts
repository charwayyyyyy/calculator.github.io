import { Calculator } from './Calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Number Input', () => {
    it('should display numbers when clicked', () => {
      const button = document.querySelector('button.number:not(.zero)') as HTMLElement;
      button.click();
      expect(document.querySelector('.current-operand')?.textContent).toBe(button.textContent);
    });

    it('should handle decimal points correctly', () => {
      const buttons = document.querySelectorAll('.number');
      buttons[1].click(); // Click any number
      const decimalButton = Array.from(buttons).find(b => b.textContent === '.');
      decimalButton?.click();
      buttons[2].click(); // Click another number
      expect(document.querySelector('.current-operand')?.textContent).toMatch(/^\d+\.\d+$/);
    });

    it('should not allow multiple decimal points', () => {
      const buttons = document.querySelectorAll('.number');
      const decimalButton = Array.from(buttons).find(b => b.textContent === '.');
      if (decimalButton) {
        decimalButton.click();
        decimalButton.click();
      }
      expect(document.querySelector('.current-operand')?.textContent?.split('.').length).toBe(2);
    });
  });

  describe('Operations', () => {
    it('should handle basic addition', async () => {
      // Mock fetch for server calculation
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ result: '15', error: null }),
        } as Response)
      );

      // Simulate: 10 + 5 = 15
      document.querySelector('button.number:contains(1)')?.click();
      document.querySelector('button.number:contains(0)')?.click();
      document.querySelector('button[data-action="add"]')?.click();
      document.querySelector('button.number:contains(5)')?.click();
      document.querySelector('button[data-action="equals"]')?.click();

      // Wait for async calculation
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(document.querySelector('.current-operand')?.textContent).toBe('15');
    });

    it('should handle division by zero', async () => {
      // Mock fetch for server calculation
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ result: null, error: 'Division by zero' }),
        } as Response)
      );

      // Simulate: 5 ÷ 0 = Error
      document.querySelector('button.number:contains(5)')?.click();
      document.querySelector('button[data-action="divide"]')?.click();
      document.querySelector('button.number:contains(0)')?.click();
      document.querySelector('button[data-action="equals"]')?.click();

      // Wait for async calculation
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(document.querySelector('.current-operand')?.textContent).toBe('Error');
    });
  });

  describe('Keyboard Support', () => {
    it('should handle number keys', () => {
      const event = new KeyboardEvent('keydown', { key: '5' });
      document.dispatchEvent(event);
      expect(document.querySelector('.current-operand')?.textContent).toBe('5');
    });

    it('should handle operation keys', () => {
      const numberEvent = new KeyboardEvent('keydown', { key: '5' });
      const operationEvent = new KeyboardEvent('keydown', { key: '+' });
      
      document.dispatchEvent(numberEvent);
      document.dispatchEvent(operationEvent);
      
      expect(document.querySelector('.previous-operand')?.textContent?.trim()).toBe('5 +');
    });

    it('should handle Enter key as equals', async () => {
      // Mock fetch for server calculation
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ result: '10', error: null }),
        } as Response)
      );

      // Simulate: 5 + 5 Enter
      document.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: '+' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      // Wait for async calculation
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(document.querySelector('.current-operand')?.textContent).toBe('10');
    });
  });

  describe('Error Handling', () => {
    it('should display error message on invalid operation', async () => {
      // Mock fetch to simulate error
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ result: null, error: 'Invalid operation' }),
        } as Response)
      );

      document.querySelector('button.number:contains(1)')?.click();
      document.querySelector('button[data-action="divide"]')?.click();
      document.querySelector('button.number:contains(0)')?.click();
      document.querySelector('button[data-action="equals"]')?.click();

      // Wait for async calculation
      await new Promise(resolve => setTimeout(resolve, 0));

      const errorDiv = document.querySelector('.calculator-error');
      expect(errorDiv).toBeTruthy();
      expect(errorDiv?.textContent).toBe('Calculation error');
    });

    it('should clear error message after timeout', async () => {
      // Mock fetch to simulate error
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ result: null, error: 'Invalid operation' }),
        } as Response)
      );

      document.querySelector('button[data-action="divide"]')?.click();
      document.querySelector('button[data-action="equals"]')?.click();

      // Wait for async calculation and error timeout
      await new Promise(resolve => setTimeout(resolve, 3100));

      const errorDiv = document.querySelector('.calculator-error');
      expect(errorDiv).toBeFalsy();
      expect(document.querySelector('.current-operand')?.textContent).toBe('0');
    });
  });
});