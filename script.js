const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Estrellas
const cantidadEstrellas = 3500;
const geometria = new THREE.BufferGeometry();
const posiciones = new Float32Array(cantidadEstrellas * 3);
const colores = new Float32Array(cantidadEstrellas * 3);

for (let i = 0; i < cantidadEstrellas; i++) {
    const i3 = i * 3;
    const r = Math.random() * 5;
    const theta = Math.random() * Math.PI * 2 + (r * 0.4);
    posiciones[i3] = Math.cos(theta) * r + (Math.random() - 0.5) * 0.3;
    posiciones[i3+1] = (Math.random() - 0.5) * 0.5;
    posiciones[i3+2] = Math.sin(theta) * r + (Math.random() - 0.5) * 0.3;

    const prob = Math.random();
    if(prob < 0.5) { // Morado
        colores[i3] = 0.6; colores[i3+1] = 0.2; colores[i3+2] = 0.9;
    } else { // Azul/Blanco
        colores[i3] = 0.2; colores[i3+1] = 0.6; colores[i3+2] = 1.0;
    }
}

geometria.setAttribute('position', new THREE.BufferAttribute(posiciones, 3));
geometria.setAttribute('color', new THREE.BufferAttribute(colores, 3));

const material = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const galaxia = new THREE.Points(geometria, material);
scene.add(galaxia);
galaxia.rotation.x = 0.5;

function animate() {
    requestAnimationFrame(animate);
    galaxia.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});