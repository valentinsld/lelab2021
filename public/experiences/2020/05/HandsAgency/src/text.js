import * as THREE from "./lib/three.js";
import { SVGLoader } from "./lib/SVGLoader.js";

export class Text {
  constructor(options) {
    var that = options.this;
    var message = options.text;

    var loader = new THREE.FontLoader();
    loader.load("src/Cristoforo_Regular.json", function (font) {
      console.log("init");

      var xMid;

      var color = new THREE.Color(0x29050f);

      var matDark = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
      });

      var shapes = font.generateShapes(message, 80);

      var geometry = new THREE.ShapeBufferGeometry(shapes);
      geometry.computeBoundingBox();
      xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      geometry.translate(xMid, 0, 0);

      // make line shape ( N.B. edge view remains visible )

      var holeShapes = [];

      for (var i = 0; i < shapes.length; i++) {
        var shape = shapes[i];

        if (shape.holes && shape.holes.length > 0) {
          for (var j = 0; j < shape.holes.length; j++) {
            var hole = shape.holes[j];
            holeShapes.push(hole);
          }
        }
      }

      shapes.push.apply(shapes, holeShapes);

      var style = SVGLoader.getStrokeStyle(2, color.getStyle());

      var strokeText = new THREE.Group();

      for (var i = 0; i < shapes.length; i++) {
        var shape = shapes[i];
        var points = shape.getPoints();
        var geometry = SVGLoader.pointsToStroke(points, style);
        var scale = 0.05;

        geometry.translate(xMid, 100, 0);
        geometry.scale(scale, scale, scale);

        var strokeMesh = new THREE.Mesh(geometry, matDark);
        strokeText.add(strokeMesh);
      }

      that.scene.add(strokeText);
    });
  }
}
