import { loadGLTF } from "./libs/loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './targets.mind',
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // Crear una luz direccional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Color blanco y intensidad 1
    directionalLight.position.set(0, 10, 0); // Posición de la luz (arriba)
    directionalLight.castShadow = true; // Habilitar la generación de sombras

    directionalLight.shadow.mapSize.width = 1024;  // Ancho del mapa de sombras
    directionalLight.shadow.mapSize.height = 1024; // Alto del mapa de sombras
    directionalLight.shadow.camera.near = 0.5;     // Cercanía de la cámara de sombras
    directionalLight.shadow.camera.far = 50;       // Lejanía de la cámara de sombras
    scene.add(directionalLight);


    const oculus = await loadGLTF('./assets/1oculus_quest.glb');
    oculus.scene.scale.set(1, 1, 1);
    oculus.scene.position.set(0, 0.5, 0);

    const smile = await loadGLTF('./assets/2smile.gltf');
    smile.scene.scale.set(10, 10, 10);
    smile.scene.position.set(0, 10, -1);

    const fb = await loadGLTF('./assets/3fb.gltf');
    fb.scene.scale.set(8, 8, 8);
    fb.scene.position.set(0, 0, 0);
    fb.scene.rotation.set( 0,Math.PI / -2, 0); // Ajusta el ángulo de rotación según sea necesario


    const wa = await loadGLTF('./assets/4wa.gltf');
    wa.scene.scale.set(8, 8, 8);
    wa.scene.position.set(0, 0, 0);
    fb.scene.rotation.set( Math.PI / 2,Math.PI / 2, 0);

    const ig = await loadGLTF('./assets/5ig.gltf');
    ig.scene.scale.set(8, 8, 8);
    ig.scene.position.set(0, 0, 0);

    const pride = await loadGLTF('./assets/6pride.gltf');
    pride.scene.scale.set(8, 8, 8);
    pride.scene.position.set(0, -0.6, 0);

    const metaiso = await loadGLTF('./assets/7meta.gltf');
    metaiso.scene.scale.set(8, 8, 8);
    metaiso.scene.position.set(0, -0.6, 0);

    const metalogo = await loadGLTF('./assets/8metalogo.gltf');
    metalogo.scene.scale.set(4, 4, 4);
    metalogo.scene.position.set(0, -0.6, 0);

    const robot = await loadGLTF('./assets/9robot.glb');
    robot.scene.scale.set(0.5, 0.5, 0.5);
    robot.scene.position.set(0, -1, 0);
    const robot2 = await loadGLTF('./assets/9robot.glb');
    robot2.scene.scale.set(0.5, 0.5, 0.5);
    robot2.scene.position.set(1.2, -1, 1);
    const robot3 = await loadGLTF('./assets/9robot.glb');
    robot3.scene.scale.set(0.5, 0.5, 1);
    robot3.scene.position.set(2.4, -1, 1);


    const oculus_anchor = mindarThree.addAnchor(0);
    oculus_anchor.group.add(oculus.scene);

    const smile_anchor = mindarThree.addAnchor(1);
    smile_anchor.group.add(smile.scene);

    const fb_anchor = mindarThree.addAnchor(2);
    fb_anchor.group.add(fb.scene);

    const wa_anchor = mindarThree.addAnchor(3);
    wa_anchor.group.add(wa.scene);

    const ig_anchor = mindarThree.addAnchor(4);
    ig_anchor.group.add(ig.scene);

    const pride_anchor = mindarThree.addAnchor(5);
    pride_anchor.group.add(pride.scene);

    const metaiso_anchor = mindarThree.addAnchor(6);
    metaiso_anchor.group.add(metaiso.scene);

    const metalogo_anchor = mindarThree.addAnchor(7);
    metalogo_anchor.group.add(metalogo.scene);

    const robot1_anchor = mindarThree.addAnchor(8);
    robot1_anchor.group.add(robot.scene);

    const robot2_anchor = mindarThree.addAnchor(8);
    robot2_anchor.group.add(robot2.scene);

    const robot3_anchor = mindarThree.addAnchor(8);
    robot3_anchor.group.add(robot3.scene);

    const mixer = new THREE.AnimationMixer(robot.scene);
    const action = mixer.clipAction(robot.animations[3]);
    action.play();
    const mixer2 = new THREE.AnimationMixer(robot2.scene);
    const action2 = mixer2.clipAction(robot2.animations[6]);
    action2.play();
    const mixer3 = new THREE.AnimationMixer(robot3.scene);
    const action3 = mixer3.clipAction(robot3.animations[10]);
    action3.play();
    /*await mindarThree.start();
    renderer.setAnimationLoop(() => {

      renderer.render(scene, camera);
    });
    */
    const clock = new THREE.Clock();

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      oculus.scene.rotation.set(0, oculus.scene.rotation.y + delta, 0);
      pride.scene.rotation.set(0, pride.scene.rotation.y + delta, 0);
      metalogo.scene.rotation.set(0, metalogo.scene.rotation.y + delta, 0);


      //robot.scene.rotation.set(0, robot.scene.rotation.y + delta, 0);
     mixer.update(delta);
      //robot2.scene.rotation.set(0, robot2.scene.rotation.y + delta, 0);
    mixer2.update(delta);
    mixer3.update(delta);
      renderer.render(scene, camera);
    });

  }
  start();
});
