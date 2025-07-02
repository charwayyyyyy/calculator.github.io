import * as THREE from 'three';
import { Calculator } from './Calculator';
import { ParticleSystem } from './ParticleSystem';

class App {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private particleSystem: ParticleSystem;
  private calculator: Calculator;

  constructor() {
    // Initialize Three.js
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Add renderer to DOM
    const container = document.querySelector('.calculator-3d');
    if (container) {
      container.appendChild(this.renderer.domElement);
    }

    // Initialize particle system
    this.particleSystem = new ParticleSystem(this.scene, {
      count: 50,
      color: 0xff9f0a,
      opacity: 0.5,
      speed: 0.01
    });

    // Initialize calculator
    this.calculator = new Calculator();

    // Set camera position
    this.camera.position.z = 5;

    // Bind events
    this.bindEvents();

    // Start animation loop
    this.animate();
  }

  private bindEvents(): void {
    window.addEventListener('resize', this.handleResize.bind(this));

    // Add theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', this.toggleTheme.bind(this));
    }

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('calculator-theme');
    if (savedTheme) {
      document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    }
  }

  private handleResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private toggleTheme(): void {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('calculator-theme', isDark ? 'dark' : 'light');

    // Update particle color based on theme
    const color = isDark ? 0x3478f6 : 0xff9f0a; // Blue for dark theme, Orange for light theme
    this.particleSystem.dispose();
    this.particleSystem = new ParticleSystem(this.scene, {
      count: 50,
      color,
      opacity: 0.5,
      speed: 0.01
    });
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.particleSystem.animate();
    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});