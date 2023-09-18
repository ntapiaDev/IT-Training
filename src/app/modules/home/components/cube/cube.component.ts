import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit, OnDestroy {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;

  private animateId = 0;

  constructor(private ngZone: NgZone) { }
  

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.init();
      this.animate();
    });
  }

  ngOnDestroy() {
    if (this.animateId) {
      cancelAnimationFrame(this.animateId);
    }
  }

  private init() {

   

    this.scene = new THREE.Scene();
     this.scene.background = new THREE.Color(0xf1f1f1); // Définir la couleur de fond à blanc
    // this.scene.background = new THREE.Color(0x333333); // Gris foncé
    
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.updateProjectionMatrix();
    // this.camera.width.left = -1; // La moitié de la largeur de la scène
    // this.camera.right = 1; // La moitié de la largeur de la scène
    // this.camera.top = 1; // La moitié de la hauteur de la scène
    // this.camera.bottom = -1; // La moitié de la hauteur de la scène
    // this.camera.position.z = 4; // Ajustez la position de la caméra en fonction de la nouvelle taille
    

    // this.renderer = new THREE.WebGLRenderer();
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, 500); // Définissez la taille du rendu
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial({ color: '#ff0008' });
    // this.cube = new THREE.Mesh(geometry, material);
    // this.scene.add(this.cube);

    const textureLoader = new THREE.TextureLoader();
    const texture1 = textureLoader.load('assets/vmw.png'); // Chemin de l'image 1
    const texture2 = textureLoader.load('assets/pole.png'); // Chemin de l'image 2
    const texture3 = textureLoader.load('assets/citrix.png'); // Chemin de l'image 3
    const texture4 = textureLoader.load('assets/ibm.png'); // Chemin de l'image 4
    const texture5 = textureLoader.load('assets/micro.png'); // Chemin de l'image 5
    const texture6 = textureLoader.load('assets/vmw.png'); // Chemin de l'image 6


    // const cubeMaterials = [
    //   new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Face avant (rouge)
    //   new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Face arrière (vert)
    //   new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Face droite (bleu)
    //   new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Face gauche (jaune)
    //   new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Face haut (magenta)
    //   new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Face bas (cyan)
    // ];
   
    // Créez des matériaux pour chaque image que vous avez chargée
    const material1 = new THREE.MeshBasicMaterial({ map: texture1 });
    const material2 = new THREE.MeshBasicMaterial({ map: texture2 });
    const material3 = new THREE.MeshBasicMaterial({ map: texture3 });
    const material4 = new THREE.MeshBasicMaterial({ map: texture4 });
    const material5 = new THREE.MeshBasicMaterial({ map: texture5 });
    const material6 = new THREE.MeshBasicMaterial({ map: texture6 });

  const cubeMaterials = [
     material1, // Face avant
     material2, // Face arrière
     material3, // Face droite (bleu)
     material4, // Face gauche (jaune)
     material5, // Face haut (magenta)
     material6, // Face bas (cyan)
 
];

    const geometry = new THREE.BoxGeometry(2, 2, 2); // Doublez la taille du cube
    this.cube = new THREE.Mesh(geometry, cubeMaterials);
    this.cube.position.set(0, -0.5, 1); // Ajustez la position du cube

    this.camera.position.set(0, 0, 0); // Ajustez la position de la caméra
    this.scene.add(this.cube);

    this.camera.position.z = 5; // Ajustez la position de la caméra
  }

  private animate() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);

    this.animateId = requestAnimationFrame(() => this.animate());
  }
}

