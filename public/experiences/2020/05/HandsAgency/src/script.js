import * as THREE from "./lib/three.js";
import { WaterTexture } from "./WaterTexture.js";
import { WaterEffect } from "./WaterEffect.js";
import { Text } from "./text.js";
import { cursor } from "./cursor.js";
import { letters } from "./letters.js";

import {
  EffectComposer,
  RenderPass,
  EffectPass,
} from "./lib/postprocessing.esm.js";

class App {
  constructor() {
    this.waterTexture = new WaterTexture({ debug: false });

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.append(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.z = 50;

    this.composer = new EffectComposer(this.renderer);
    this.clock = new THREE.Clock();

    this.tick = this.tick.bind(this);
    this.init();
  }
  addText() {
    console.log("add text");
    this.renderer.setClearColor(0xede2dc, 1);

    this.text = new Text({
      this: this,
      text: "  SRHINK\nOF BLACK\n QUARTS\n JUDGENY\n     VOW",
    });

    window.addEventListener("mousemove", this.onMouseMove);
  }
  initComposer() {
    const renderPass = new RenderPass(this.scene, this.camera);
    this.waterEffect = new WaterEffect(this.waterTexture.texture);
    const waterPass = new EffectPass(this.camera, this.waterEffect);

    renderPass.renderToScreen = false;
    waterPass.renderToScreen = true;
    this.composer.addPass(renderPass);
    this.composer.addPass(waterPass);
  }
  init() {
    this.initComposer();

    this.cursor1 = new cursor({ id: "#cursor", speed: 0.5 });
    this.cursor2 = new cursor({ id: "#cursorS", speed: 0.15 });

    this.letter = new letters();

    this.addText();
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.tick();

    document.querySelectorAll("a").forEach((e) => {
      e.addEventListener("mouseover", function () {
        document.querySelector("body").classList.add('hov');
      });
      e.addEventListener("mouseout", function () {
        document.querySelector("body").classList.remove('hov');
      });
    });

  }
  onMouseMove(ev) {
    const point = {
      x: ev.clientX / window.innerWidth,
      y: ev.clientY / window.innerHeight,
    };

    this.waterTexture.addPoint(point);
  }
  render() {
    this.composer.render(this.clock.getDelta());
  }

  tick() {
    var that = this;
    this.render();
    this.waterTexture.update();
    // this.cursor1.animate()
    requestAnimationFrame(this.tick);
    requestAnimationFrame(function () {
      that.cursor1.animate();
    });
    requestAnimationFrame(function () {
      that.cursor2.animate();
    });
  }
}
const myApp = new App();
