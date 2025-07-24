import { useRef, useEffect } from "react";
import * as THREE from "three";
import minhaFoto from "../../assets/otavio.png";

export default function Photo3D() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const width = 450;
        const height = 450;
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
        camera.position.z = 7; // mais zoom inicial

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Textura da foto com colorSpace sRGB
        const texture = new THREE.TextureLoader().load(minhaFoto);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;

        // Materiais: foto na frente, escuro nas outras faces
        const materials = [
            new THREE.MeshBasicMaterial({ color: "#fff" }), // direita
            new THREE.MeshBasicMaterial({ color: "#fff" }), // esquerda
            new THREE.MeshBasicMaterial({ color: "#fff" }), // topo
            new THREE.MeshBasicMaterial({ color: "#fff" }), // baixo
            new THREE.MeshBasicMaterial({ map: texture, transparent: true }),  // frente (foto)
            new THREE.MeshBasicMaterial({ map: texture, transparent: true }), // trás
        ];

        // Cubo
        const geometry = new THREE.BoxGeometry(4, 4, 0.1);
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        // Interação de rotação com zoom dinâmico
        let isDragging = false;
        let prevX = 0, prevY = 0;
        let velocityX = 0, velocityY = 0;
        let targetZoom = 7; // zoom padrão
        let currentZoom = 7;

        const onPointerDown = (e: PointerEvent) => {
            // Zoom out ao clicar e gira aleatoriamente
            if (!isDragging) {
                velocityX = (Math.random() - 0.5) * 4;
                velocityY = (Math.random() - 0.5) * 4;
                targetZoom = 9; // zoom out ao clicar
            }
            isDragging = true;
            prevX = e.clientX;
            prevY = e.clientY;
        };

        const onPointerUp = () => { 
            isDragging = false; 
            targetZoom = 7; // volta ao zoom normal
        };

        const onPointerMove = (e: PointerEvent) => {
            if (isDragging) {
                velocityX = (e.clientX - prevX) * 0.005;
                velocityY = (e.clientY - prevY) * 0.005;
                prevX = e.clientX;
                prevY = e.clientY;
            }
        };

        renderer.domElement.addEventListener("pointerdown", onPointerDown);
        renderer.domElement.addEventListener("pointerup", onPointerUp);
        renderer.domElement.addEventListener("pointerleave", onPointerUp);
        renderer.domElement.addEventListener("pointermove", onPointerMove);

        // Render loop com inércia e zoom animado
        const animate = () => {
            if (!isDragging) {
                velocityX *= 0.95;
                velocityY *= 0.95;
            }

            // Animação suave do zoom
            currentZoom += (targetZoom - currentZoom) * 0.1;
            camera.position.z = currentZoom;

            cube.rotation.y += velocityX;
            cube.rotation.x += velocityY;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Monta o canvas
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Cleanup
        return () => {
            renderer.domElement.remove();
        };
    }, []);

    return <div ref={mountRef} style={{ width: 450, height: 450 }} />;
}