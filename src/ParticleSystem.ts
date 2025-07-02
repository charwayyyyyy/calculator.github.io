import * as THREE from 'three';

export interface ParticleConfig {
  count: number;
  size: number;
  color: number;
  opacity: number;
  speed: number;
}

export class ParticleSystem {
  private particles: THREE.Mesh[] = [];
  private scene: THREE.Scene;
  private config: ParticleConfig;

  constructor(scene: THREE.Scene, config: Partial<ParticleConfig> = {}) {
    this.scene = scene;
    this.config = {
      count: config.count || 50,
      size: config.size || 0.1,
      color: config.color || 0xff9f0a,
      opacity: config.opacity || 0.5,
      speed: config.speed || 0.01
    };
    this.init();
  }

  private init(): void {
    const geometry = new THREE.SphereGeometry(this.config.size, 8, 8);
    const material = new THREE.MeshBasicMaterial({
      color: this.config.color,
      transparent: true,
      opacity: this.config.opacity
    });

    for (let i = 0; i < this.config.count; i++) {
      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      );
      this.particles.push(particle);
      this.scene.add(particle);
    }
  }

  public animate(): void {
    this.particles.forEach(particle => {
      particle.position.y += this.config.speed;
      if (particle.position.y > 10) {
        particle.position.y = -10;
      }
      particle.rotation.x += this.config.speed;
      particle.rotation.y += this.config.speed;
    });
  }

  public dispose(): void {
    this.particles.forEach(particle => {
      this.scene.remove(particle);
      particle.geometry.dispose();
      (particle.material as THREE.Material).dispose();
    });
    this.particles = [];
  }

  public setSpeed(speed: number): void {
    this.config.speed = speed;
  }

  public setOpacity(opacity: number): void {
    this.config.opacity = opacity;
    this.particles.forEach(particle => {
      (particle.material as THREE.MeshBasicMaterial).opacity = opacity;
    });
  }
}