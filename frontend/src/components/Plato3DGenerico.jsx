import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function Plato3DGenerico({ foto, nombre }) {

  const contenedorRef = useRef(null);

  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const ancho = contenedor.clientWidth || 800;
    const alto = contenedor.clientHeight || 600;

    const escena = new THREE.Scene();

    const camara = new THREE.PerspectiveCamera(45, ancho / alto, 0.1, 100);
    camara.position.set(3.2, 2.6, 5.2);
    camara.lookAt(0, 0.7, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(ancho, alto);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    contenedor.appendChild(renderer.domElement);

    const controles = new OrbitControls(camara, renderer.domElement);
    controles.enableDamping = true;
    controles.dampingFactor = 0.08;
    controles.autoRotate = true;
    controles.autoRotateSpeed = 1.8;
    controles.minDistance = 2.5;
    controles.maxDistance = 12;
    controles.target.set(0, 0.7, 0);

    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.75);
    escena.add(luzAmbiente);

    const luzPrincipal = new THREE.DirectionalLight(0xffffff, 1.2);
    luzPrincipal.position.set(4, 7, 5);
    luzPrincipal.castShadow = true;
    escena.add(luzPrincipal);

    const luzRellena = new THREE.PointLight(0xffd9a0, 0.6, 20);
    luzRellena.position.set(-3, 4, -2);
    escena.add(luzRellena);

    const materialMadera = new THREE.MeshStandardMaterial({
      color: 0x6b4423,
      roughness: 0.85,
      metalness: 0.05
    });

    const tablero = new THREE.Mesh(new THREE.BoxGeometry(7, 0.22, 3.4), materialMadera);
    tablero.position.y = -0.11;
    tablero.receiveShadow = true;
    escena.add(tablero);

    for (const px of [-3.25, 3.25]) {
      for (const pz of [-1.5, 1.5]) {
        const pata = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.5, 0.22), materialMadera);
        pata.position.set(px, -0.86, pz);
        escena.add(pata);
      }
    }

    const plato = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.68, 0.1, 32),
      new THREE.MeshStandardMaterial({ color: 0xf5f1ea, roughness: 0.5, metalness: 0.1 })
    );
    plato.position.y = 0.05;
    plato.receiveShadow = true;
    escena.add(plato);

    const textura = new THREE.TextureLoader().load(foto, undefined, () => {
      if (!textura.image) return;
      const ok = textura.image.naturalWidth > 0;
      if (ok) {
        const rel = textura.image.height > 0 ? textura.image.width / textura.image.height : 1;
        const anchoFoto = 2.1;
        const altoFoto = anchoFoto / Math.max(rel, 0.1);
        marco.scale.set(anchoFoto, altoFoto, 1);
        fotoMesh.scale.set(anchoFoto * 0.96, altoFoto * 0.96, 1);
      }
    });

    const materialFoto = new THREE.MeshStandardMaterial({
      map: textura,
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.0
    });

    const marco = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 2.2, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x3a2417, roughness: 0.6 })
    );
    marco.position.set(0, 1.65, 0.05);
    marco.rotation.x = -0.18;
    marco.castShadow = true;
    escena.add(marco);

    const fotoMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 2.1), materialFoto);
    fotoMesh.position.set(0, 1.655, 0.095);
    fotoMesh.rotation.x = -0.18;
    escena.add(fotoMesh);

    let id;
    const animar = () => {
      id = requestAnimationFrame(animar);
      controles.update();
      renderer.render(escena, camara);
    };
    animar();

    const observador = new ResizeObserver(() => {
      const w = contenedor.clientWidth;
      const h = contenedor.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      camara.aspect = w / h;
      camara.updateProjectionMatrix();
    });
    observador.observe(contenedor);

    return () => {
      cancelAnimationFrame(id);
      observador.disconnect();
      controles.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      [tablero, plato, marco, fotoMesh].forEach((m) => {
        if (m.geometry) m.geometry.dispose();
        if (m.material) m.material.dispose();
      });
      if (textura) textura.dispose();
    };
  }, [foto]);

  return (
    <div className="plato3d-generico">
      <div ref={contenedorRef} className="plato3d-generico-canvas" />
      <div className="plato3d-generico-leyenda">
        👆 Arrastrá para rotar — {nombre || 'Plato'}
      </div>
    </div>
  );
}

export default Plato3DGenerico;
