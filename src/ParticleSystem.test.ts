import * as THREE from 'three';
import { ParticleSystem, ParticleConfig } from './ParticleSystem';

describe('ParticleSystem', () => {
  let scene: THREE.Scene;
  let particleSystem: ParticleSystem;
  let defaultConfig: ParticleConfig;

  beforeEach(() => {
    scene = new THREE.Scene();
    defaultConfig = {
      count: 50,
      size: 0.1,
      color: 0xff9f0a,
      opacity: 0.5,
      speed: 0.01
    };
    particleSystem = new ParticleSystem(scene, defaultConfig);
  });

  it('should create particles with default configuration', () => {
    const particles = scene.children.filter(child => child instanceof THREE.Mesh);
    expect(particles.length).toBe(defaultConfig.count);

    const particle = particles[0] as THREE.Mesh;
    const material = particle.material as THREE.MeshBasicMaterial;

    expect(particle.geometry instanceof THREE.SphereGeometry).toBeTruthy();
    expect(material.color.getHex()).toBe(defaultConfig.color);
    expect(material.opacity).toBe(defaultConfig.opacity);
  });

  it('should create particles with custom configuration', () => {
    const customConfig: ParticleConfig = {
      count: 30,
      size: 0.2,
      color: 0x00ff00,
      opacity: 0.8,
      speed: 0.02
    };

    const customParticleSystem = new ParticleSystem(scene, customConfig);
    const particles = scene.children.filter(child => child instanceof THREE.Mesh);
    
    // Count includes particles from both systems
    expect(particles.length).toBe(defaultConfig.count + customConfig.count);

    // Get the last particle (from custom system)
    const particle = particles[particles.length - 1] as THREE.Mesh;
    const material = particle.material as THREE.MeshBasicMaterial;

    expect(material.color.getHex()).toBe(customConfig.color);
    expect(material.opacity).toBe(customConfig.opacity);
  });

  it('should animate particles', () => {
    const particles = scene.children.filter(child => child instanceof THREE.Mesh);
    const particle = particles[0] as THREE.Mesh;
    const initialY = particle.position.y;
    const initialRotationX = particle.rotation.x;
    const initialRotationY = particle.rotation.y;

    particleSystem.animate();

    expect(particle.position.y).toBe(initialY + defaultConfig.speed);
    expect(particle.rotation.x).toBe(initialRotationX + defaultConfig.speed);
    expect(particle.rotation.y).toBe(initialRotationY + defaultConfig.speed);
  });

  it('should reset particle position when reaching top boundary', () => {
    const particles = scene.children.filter(child => child instanceof THREE.Mesh);
    const particle = particles[0] as THREE.Mesh;
    particle.position.y = 11; // Above boundary

    particleSystem.animate();

    expect(particle.position.y).toBe(-10); // Reset to bottom
  });

  it('should dispose particles correctly', () => {
    const initialChildCount = scene.children.length;
    particleSystem.dispose();
    expect(scene.children.length).toBe(initialChildCount - defaultConfig.count);
  });

  it('should update particle speed', () => {
    const newSpeed = 0.05;
    particleSystem.setSpeed(newSpeed);

    const particles = scene.children.filter(child => child instanceof THREE.Mesh);
    const particle = particles[0] as THREE.Mesh;
    const initialY = particle.position.y;

    particleSystem.animate();

    expect(particle.position.y).toBe(initialY + newSpeed);
  });

  it('should update particle opacity', () => {
    const newOpacity = 0.8;
    particleSystem.setOpacity(newOpacity);

    const particles = scene.children.filter(child => child instanceof THREE.Mesh);
    particles.forEach(particle => {
      const material = (particle as THREE.Mesh).material as THREE.MeshBasicMaterial;
      expect(material.opacity).toBe(newOpacity);
    });
  });
});