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

    const oculus = await loadGLTF('./assets/1oculus_quest.glb');
    oculus.scene.scale.set(4, 4, 4);
    oculus.scene.position.set(0, -0.4, 0);

    const smile = await loadGLTF('./assets/2smile.gltf');
    smile.scene.scale.set(10, 10, 10);
    smile.scene.position.set(0, -0.5, 0);

    const fb = await loadGLTF('./assets/3fb.gltf');
    fb.scene.scale.set(8, 8, 8);
    fb.scene.position.set(0, 0, 0);

    const wa = await loadGLTF('./assets/4wa.gltf');
    wa.scene.scale.set(8, 8, 8);
    wa.scene.position.set(0, 0, 0);

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
    metalogo.scene.scale.set(8, 8, 8);
    metalogo.scene.position.set(0, -0.6, 0);

    const robot = await loadGLTF('./assets/9robot.glb');
    robot.scene.scale.set(0.5, 0.5, 0.5);
    robot.scene.position.set(0, -1, 0);
    const robot2 = await loadGLTF('./assets/9robot.glb');
    robot2.scene.scale.set(0.5, 0.5, 0.5);
    robot2.scene.position.set(1, -1, 1);


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

    const mixer = new THREE.AnimationMixer(robot.scene);
    const action = mixer.clipAction(robot.animations[3]);
    action.play();
    const mixer2 = new THREE.AnimationMixer(robot2.scene);
    const action2 = mixer2.clipAction(robot2.animations[3]);
    action2.play();
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
      fb.scene.rotation.set(0, fb.scene.rotation.z + delta, 0);

      robot.scene.rotation.set(0, robot.scene.rotation.y + delta, 0);
      mixer.update(delta);
      robot2.scene.rotation.set(0, robot2.scene.rotation.y + delta, 0);
      mixer2.update(delta);
      renderer.render(scene, camera);
    });

  }
  start();
});
