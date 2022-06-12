import * as React from "react";
import { Component } from "react";
import * as THREE from "three";
import axios from "axios";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "../css/cube.css";

interface CubeProps {}

interface CubeState {}

class Cube extends React.Component<CubeProps, CubeState> {
  canvasRef = React.createRef<HTMLCanvasElement>();

  // async get3DObjects() {
  //   const { data } = await axios.get(
  //     "https://atomic-clock-prod.herokuapp.com/3D/objects/"
  //   );
  //   return data;
  // }

  async getResourcePath(name: string, type: string = "files"): Promise<string> {
    const endpoint = "https://atomic-clock-prod.herokuapp.com/3D/";
    const { data } = await axios.get(endpoint + type + "/" + name + "/");
    return data.filePath;
  }

  async loadObject(scene: any) {
    //Load object from backend
    console.log("start loading");
    const gltfLoader = new GLTFLoader();
    const url = await this.getResourcePath("CityResource");
    gltfLoader.load(url, (gltf) => {
      const root = gltf.scene;
      scene.add(root);
    });
    console.log("finishing..");
  }

  componentDidMount() {
    //Get the canvas
    const canvas =
      this.canvasRef.current === null ? undefined : this.canvasRef.current;

    //Create the renderer
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(1000, 500);
    renderer.setClearColor("black", 0);

    //Set the camera props and create camera
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    //Create scene
    const scene = new THREE.Scene();

    //Set the default geometry for the cube and create its geometry
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    //Create a basic material for the cube and set the initial color
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

    //Create the cube
    // const cube = new THREE.Mesh(geometry, material);

    //Create the light
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    //Add the cube to the scene. Then render the scene
    // scene.add(cube);
    renderer.render(scene, camera);

    //loadObject
    this.loadObject(scene);

    //GoOn
    function resizeRendererToDisplaySize(renderer: any) {
      const canvas = renderer.domElement;
      const pixelRatio = window.devicePixelRatio;
      const width = (canvas.clientWidth * pixelRatio) | 0;
      const height = (canvas.clientHeight * pixelRatio) | 0;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    //Animate the cube
    function render(time: number) {
      time *= 0.001; // convert time to seconds

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      // cube.rotation.x = time;
      // cube.rotation.y = time;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  render(): React.ReactNode {
    return (
      <div className="canvasContainer">
        <canvas ref={this.canvasRef} id="c"></canvas>
      </div>
    );
  }
}

export default Cube;
