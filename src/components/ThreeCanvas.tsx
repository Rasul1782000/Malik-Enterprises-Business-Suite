import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Get exact bounding box
    let width = container.clientWidth;
    let height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create complex multi-ring geometry representing Malik Enterprises (Logistics, Polymers, Maintenance)
    const group = new THREE.Group();
    scene.add(group);

    // 1. Central "Polymer core" sphere
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7, // Sky Blue 600
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 2. Surrounding "Logistics orbit" ring
    const ringGeo = new THREE.TorusGeometry(2.0, 0.04, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Sky Blue 400
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    group.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.y = Math.PI / 3;
    group.add(ringMesh2);

    // 3. Machinery Node Satellites
    const satGroup = new THREE.Group();
    const satGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const satMat = new THREE.MeshBasicMaterial({
      color: 0xbae6fd, // Sky Blue 200
    });

    const numSats = 6;
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < numSats; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / numSats) * Math.PI * 2;
      sat.position.set(Math.cos(angle) * 2.0, Math.sin(angle) * 2.0, 0);
      satGroup.add(sat);
      satellites.push(sat);
    }
    satGroup.rotation.x = Math.PI / 4;
    group.add(satGroup);

    // 4. Subtle background particle cloud
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;     // X
      positions[i + 1] = (Math.random() - 0.5) * 8; // Y
      positions[i + 2] = (Math.random() - 0.5) * 6; // Z
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xbae6fd,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Point light
    const pointLight = new THREE.PointLight(0x0ea5e9, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Mouse movement response
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (event: MouseEvent) => {
      // Normalize coordinate offsets
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      targetX = (x / width - 0.5) * 1.5;
      targetY = (y / height - 0.5) * 1.5;
    };

    container.addEventListener("mousemove", onMouseMove);

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height || 450;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Continuous rotations
      coreMesh.rotation.y = elapsedTime * 0.2;
      coreMesh.rotation.x = elapsedTime * 0.1;

      ringMesh1.rotation.z = -elapsedTime * 0.15;
      ringMesh2.rotation.z = elapsedTime * 0.1;

      satGroup.rotation.z = elapsedTime * 0.12;

      // Animate individual satellite pulses
      satellites.forEach((sat, idx) => {
        const scale = 1 + Math.sin(elapsedTime * 3 + idx) * 0.15;
        sat.scale.set(scale, scale, scale);
      });

      // Gently drift particles
      const positionsArr = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positionsArr.length; i += 3) {
        positionsArr[i] += Math.sin(elapsedTime + i) * 0.001; // subtle y-drift
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Smooth mouse interaction lag (lerp)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      group.rotation.y = currentX;
      group.rotation.x = currentY;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full min-h-[350px] md:min-h-[450px] flex items-center justify-center overflow-hidden"
      id="three-canvas-container"
    >
      <canvas ref={canvasRef} className="block max-w-full pointer-events-none" id="three-js-canvas" />
    </div>
  );
}
