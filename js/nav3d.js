/* ============================================================
   NAV3D.JS — Low-Poly Atmospheric Penguin & Icy Path
   ============================================================ */

const container = document.getElementById('nav-3d-container');

// 1. Scene Setup & Colors
const PALETTE = {
  sky: 0x87CEFA,      
  water: 0x48D1CC,    
  ice: 0xFFFFFF,      
  penguinBody: 0x242424, 
  penguinWhite: 0xFFFFFF,
  penguinOrange: 0xFFB347
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(PALETTE.sky);
scene.fog = new THREE.Fog(PALETTE.sky, 10, 100); 

const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 12); 

const renderer = new THREE.WebGLRenderer({ antialias: false }); 
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.HemisphereLight(0xffffff, PALETTE.water, 0.85);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(10, 15, 10);
dirLight.castShadow = true;
scene.add(dirLight);

// 2. Environment (Water & Snow)
const waterGeo = new THREE.PlaneGeometry(300, 300, 15, 15);
const waterMat = new THREE.MeshStandardMaterial({ 
  color: PALETTE.water, 
  flatShading: true, 
  roughness: 0.8, 
  metalness: 0.1 
});
const water = new THREE.Mesh(waterGeo, waterMat);
water.rotation.x = -Math.PI / 2;
water.position.y = -0.2; 
water.receiveShadow = true;
scene.add(water);

const shoreGroup = new THREE.Group();
const shoreMat = new THREE.MeshStandardMaterial({ 
  color: PALETTE.ice, 
  flatShading: true, 
  roughness: 1.0 
});

// MAIN PLATFORM BASE
const baseShore = new THREE.Mesh(new THREE.BoxGeometry(200, 2, 80), shoreMat);
baseShore.position.set(0, -1, 38); 
baseShore.receiveShadow = true;
shoreGroup.add(baseShore);

// --- THE JAGGED MAIN PLATFORM COASTLINE (Lowered & Less Dense) ---
const edgeGeo = new THREE.IcosahedronGeometry(2.0, 0); 

// Reduced from 90 down to 35 chunks so it's not overcrowded
for(let i = 0; i < 35; i++) {
    const chunk = new THREE.Mesh(edgeGeo, shoreMat);
    const xPos = (Math.random() - 0.5) * 160; 
    let zPos = -1 + (Math.random() * 4);      

    // Safe zone for the penguin
    if (Math.abs(xPos) < 6 && zPos < 4) {
        zPos += 5; 
    }

    // Lowered into the ground (-0.8)
    chunk.position.set(xPos, -0.8, zPos);
    // Squashed heavily on the Y axis (0.2 - 0.5) so they stay low and flat-ish
    chunk.scale.set(1.5 + Math.random()*1.5, 0.2 + Math.random()*0.3, 1.5 + Math.random()*1.5); 
    chunk.rotation.set(Math.random(), Math.random(), Math.random());
    chunk.receiveShadow = true;
    chunk.castShadow = true;
    shoreGroup.add(chunk);
}

// --- YELLOW ZONES: Framing Background Mountains ---
const mountainGeo = new THREE.ConeGeometry(18, 30, 6); 
const mountain1 = new THREE.Mesh(mountainGeo, shoreMat);
mountain1.position.set(-30, 5, -50); 
mountain1.rotation.y = Math.random();
scene.add(mountain1);

const mountain2 = new THREE.Mesh(mountainGeo, shoreMat);
mountain2.position.set(30, 6, -55); 
mountain2.scale.set(1.2, 1.1, 1.2);
mountain2.rotation.y = Math.random();
scene.add(mountain2);

// --- PURPLE ZONES: Jagged Ice Ridges clustered near the mountains ---
function createJaggedRidge(centerX, centerZ) {
    for(let i = 0; i < 45; i++) {
        const chunk = new THREE.Mesh(edgeGeo, shoreMat);
        const xPos = centerX + (Math.random() - 0.5) * 45;
        const zPos = centerZ + (Math.random() - 0.5) * 20 + 8; 
        
        chunk.position.set(xPos, -0.5, zPos);
        chunk.scale.set(1 + Math.random()*2.0, 0.5 + Math.random()*1.5, 1 + Math.random()*2.0); 
        chunk.rotation.set(Math.random(), Math.random(), Math.random());
        chunk.receiveShadow = true;
        chunk.castShadow = true;
        shoreGroup.add(chunk);
    }
}
createJaggedRidge(-30, -50);
createJaggedRidge(30, -55);

scene.add(shoreGroup);

// 3. ILLUSTRATION PENGUIN (Arms, Orange Beak, Orange Feet)
const penguinGroup = new THREE.Group();
const matBlack = new THREE.MeshStandardMaterial({ color: PALETTE.penguinBody, flatShading: true });
const matWhite = new THREE.MeshStandardMaterial({ color: PALETTE.penguinWhite, flatShading: true });
const matOrange = new THREE.MeshStandardMaterial({ color: PALETTE.penguinOrange, flatShading: true });

// Chubby Body
const body = new THREE.Mesh(new THREE.SphereGeometry(1.3, 16, 16), matBlack);
body.position.y = 1.3; 
body.scale.set(1.15, 1.2, 1.1); 
body.castShadow = true;
penguinGroup.add(body);

// Big Head
const head = new THREE.Mesh(new THREE.SphereGeometry(1.0, 16, 16), matBlack);
head.position.set(0, 3.0, 0);
head.scale.set(1.1, 1.0, 1.1);
head.castShadow = true;
penguinGroup.add(head);

// White Belly
const belly = new THREE.Mesh(new THREE.SphereGeometry(1.1, 16, 16), matWhite);
belly.position.set(0, 1.2, -0.4); 
belly.scale.set(1.05, 1.15, 0.8); 
penguinGroup.add(belly);

// White Face Mask
const mask = new THREE.Mesh(new THREE.SphereGeometry(0.85, 16, 16), matWhite);
mask.position.set(0, 3.0, -0.35); 
mask.scale.set(1.05, 0.9, 0.8); 
penguinGroup.add(mask);

// Orange Beak
const beak = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.6, 16), matOrange);
beak.position.set(0, 2.9, -0.95);
beak.rotation.x = -Math.PI / 2;
penguinGroup.add(beak);

// Little Flippers (Arms)
const flipperGeo = new THREE.SphereGeometry(0.5, 16, 16);
const flipperL = new THREE.Mesh(flipperGeo, matBlack);
flipperL.position.set(-1.4, 1.4, 0);
flipperL.scale.set(0.3, 1.8, 0.7);
flipperL.rotation.z = -0.2; 
penguinGroup.add(flipperL);

const flipperR = new THREE.Mesh(flipperGeo, matBlack);
flipperR.position.set(1.4, 1.4, 0);
flipperR.scale.set(0.3, 1.8, 0.7);
flipperR.rotation.z = 0.2;
penguinGroup.add(flipperR);

// Orange Feet
const footGeo = new THREE.SphereGeometry(0.5, 12, 12);
const footL = new THREE.Mesh(footGeo, matOrange);
footL.position.set(-0.6, 0.15, -0.2); 
footL.scale.set(1.0, 0.3, 1.4);
footL.rotation.y = -0.3;
penguinGroup.add(footL);

const footR = new THREE.Mesh(footGeo, matOrange);
footR.position.set(0.6, 0.15, -0.2); 
footR.scale.set(1.0, 0.3, 1.4);
footR.rotation.y = 0.3;
penguinGroup.add(footR);

penguinGroup.position.set(0, -0.1, -0.5);
scene.add(penguinGroup);

// 4. CLUSTERED ICE PIECES (Restored the perfect solid jagged shapes you liked!)
const iceData = [
  { id: 'battle', url: 'pages/battle.html', x: -10.0, z: -8.0, rot: 0.4,  size: 1.8 }, 
  { id: 'learn',  url: 'pages/learn.html',  x: 10.0,  z: -8.5, rot: -0.2, size: 2.0 }, 
  { id: 'ranks',  url: '#',                 x: -4.5,  z: -14.0, rot: 0.8,  size: 2.2 },
  { id: 'home',   url: 'close',             x: 4.5,   z: -15.0, rot: -0.5, size: 2.4 }
];

const iceBlocks = [];
const iceMat = new THREE.MeshStandardMaterial({ 
  color: PALETTE.ice, 
  flatShading: true, 
  roughness: 0.8
});

iceData.forEach((data) => {
  const iceGrp = new THREE.Group();
  
  // Clustered cylinders to create perfect solid edges with NO holes
  const chunks = [
      {x: 0,    z: 0,    s: 1.2, edges: 6},
      {x: 0.6,  z: 0.4,  s: 1.0, edges: 5},
      {x: -0.5, z: -0.6, s: 0.9, edges: 7},
      {x: 0.4,  z: -0.5, s: 0.8, edges: 6}
  ];

  chunks.forEach(c => {
      const chunkMesh = new THREE.Mesh(new THREE.CylinderGeometry(c.s, c.s + 0.1, 0.4, c.edges), iceMat);
      chunkMesh.position.set(c.x, 0, c.z);
      chunkMesh.rotation.y = Math.random();
      chunkMesh.receiveShadow = true;
      chunkMesh.castShadow = true;
      chunkMesh.userData = { parentGroup: iceGrp };
      iceGrp.add(chunkMesh);
  });

  iceGrp.position.set(data.x, -4, data.z); 
  iceGrp.rotation.y = data.rot;
  
  iceGrp.userData = { id: data.id, url: data.url, baseY: 0.1, baseScale: data.size }; 
  iceGrp.scale.setScalar(data.size);
  
  scene.add(iceGrp);
  iceBlocks.push(iceGrp);

  const label = document.getElementById(`label-${data.id}`);
  if (label) {
    label.innerHTML = `▼ ${label.innerHTML}`;
  }
});

// 5. Cinematic Animation Sequence
setTimeout(() => {
  iceBlocks.forEach((iceGrp, index) => {
    gsap.to(iceGrp.position, {
      y: iceGrp.userData.baseY,
      duration: 1.5,
      delay: index * 0.2,
      ease: "elastic.out(1.1, 0.6)"
    });
  });

  gsap.to(camera.position, {
    y: 5.2, 
    z: 7.5, 
    duration: 3.0,
    delay: 1.0,
    ease: "power2.inOut",
    onUpdate: () => camera.lookAt(0, 1.5, -15) 
  });

  setTimeout(() => {
      document.querySelectorAll('.ice-label').forEach(l => l.classList.add('visible'));
  }, 2500);

}, 800);

camera.lookAt(0, 2.0, 0); 

// 6. Raycaster (Interactivity)
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredIceBlock = null;

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(iceBlocks, true); 
  
  hoveredIceBlock = null;
  document.body.style.cursor = 'default';

  if (intersects.length > 0) {
    hoveredIceBlock = intersects[0].object.userData.parentGroup;
    document.body.style.cursor = 'pointer';
  }
});

window.addEventListener('click', () => {
  if (hoveredIceBlock) {
    const targetUrl = hoveredIceBlock.userData.url;
    if (targetUrl === 'close') {
      container.style.opacity = '0';
      setTimeout(() => container.style.display = 'none', 1000);
    } else {
      window.location.href = targetUrl;
    }
  }
});

// Render Loop 
function animate() {
  requestAnimationFrame(animate);
  const time = Date.now() * 0.0012;
  
  iceBlocks.forEach((iceGrp, i) => {
    const vector = iceGrp.position.clone();
    vector.y += 0.8; 
    vector.project(camera);
    const x = (vector.x * .5 + .5) * window.innerWidth;
    const y = (vector.y * -.5 + .5) * window.innerHeight;

    const label = document.getElementById(`label-${iceGrp.userData.id}`);
    if (label) {
      label.style.left = `${x}px`;
      label.style.top = `${y}px`;
    }

    if (iceGrp.position.y > -2) { 
      iceGrp.position.y = iceGrp.userData.baseY + Math.sin(time + i) * 0.05;
      
      let targetMult = 1.0 + Math.sin(time * 3 + i) * 0.03; 
      if (iceGrp === hoveredIceBlock) targetMult *= 1.15; 
      
      iceGrp.scale.lerp(
          new THREE.Vector3(
              iceGrp.userData.baseScale * targetMult, 
              iceGrp.userData.baseScale * targetMult, 
              iceGrp.userData.baseScale * targetMult
          ), 
          0.1
      );
    }
  });

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});