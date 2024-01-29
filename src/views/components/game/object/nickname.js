import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { Side } from "../../../../enum/constant.js";
import {
    tableHeight,
    tableWidth,
} from "./config/sizeConfig.js";

export default function createNicknameObject(nickname, side) {
    const loader = new FontLoader();
    let nicknameObject = new THREE.Group();

    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
        const geometry = new TextGeometry(nickname, {
            font: font,
            size: 0.2,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 5
        });
        const material = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
        const text = new THREE.Mesh(geometry, material);

        text.geometry.computeBoundingBox();
        const textSize = text.geometry.boundingBox.getSize(new THREE.Vector3());
        const nicknameSpacing = 0.5;

        if (side === Side.LEFT) {
            text.position.set(-tableWidth / 2 + nicknameSpacing, tableHeight / 2 + 0.5, 0);
        } else if (side === Side.RIGHT) {
            text.position.set(tableWidth / 2 - textSize.x - nicknameSpacing, tableHeight / 2 + 0.5, 0);
        }

        nicknameObject.add(text);
    });

    return nicknameObject;
}