// Add custom jest matchers for DOM elements
expect.extend({
  toHaveClass: function (received: HTMLElement, className: string) {
    const pass = received.classList.contains(className);
    return {
      message: () =>
        `expected ${received.className} ${pass ? 'not ' : ''}to contain ${className}`,
      pass,
    };
  },
});

// Mock Three.js
jest.mock('three', () => ({
  Scene: jest.fn(),
  PerspectiveCamera: jest.fn(),
  WebGLRenderer: jest.fn().mockImplementation(() => ({
    setSize: jest.fn(),
    render: jest.fn(),
    domElement: document.createElement('canvas'),
  })),
  SphereGeometry: jest.fn(),
  MeshBasicMaterial: jest.fn(),
  Mesh: jest.fn().mockImplementation(() => ({
    position: { set: jest.fn(), y: 0 },
    rotation: { x: 0, y: 0 },
    geometry: { dispose: jest.fn() },
    material: { dispose: jest.fn() },
  })),
}));

// Mock GSAP
jest.mock('gsap', () => ({
  to: jest.fn(),
}));

// Create required DOM elements for tests
beforeEach(() => {
  document.body.innerHTML = `
    <div class="calculator">
      <div class="display">
        <div class="previous-operand"></div>
        <div class="current-operand">0</div>
      </div>
      <div class="calculator-3d"></div>
      <div class="keypad">
        <button class="operator" data-action="clear">AC</button>
        <button class="operator" data-action="plusMinus">±</button>
        <button class="operator" data-action="percentage">%</button>
        <button class="operator" data-action="divide">÷</button>
        <button class="number">7</button>
        <button class="number">8</button>
        <button class="number">9</button>
        <button class="operator" data-action="multiply">×</button>
        <button class="number">4</button>
        <button class="number">5</button>
        <button class="number">6</button>
        <button class="operator" data-action="subtract">−</button>
        <button class="number">1</button>
        <button class="number">2</button>
        <button class="number">3</button>
        <button class="operator" data-action="add">+</button>
        <button class="number zero">0</button>
        <button class="number">.</button>
        <button class="operator" data-action="equals">=</button>
      </div>
    </div>
  `;
});

// Clean up after each test
afterEach(() => {
  document.body.innerHTML = '';
  jest.clearAllMocks();
});