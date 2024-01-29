import store from "../../../store/index.js";
import Component from "../../../library/component.js";
import {Side, Game} from "../../../enum/constant.js";
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import TWEEN from '@tweenjs/tween.js';
import {table} from "./object/table.js";
import {northWall, southWall, eastWall, westWall} from "./object/wall.js";
import {ball} from "./object/ball.js";
import {leftPaddle, rightPaddle} from "./object/paddle.js"
import createNicknameObject from "./object/nickname.js";
import createScoreObject from "./object/score.js";
import {scoreSeparator} from "./object/scoreSeperator.js";

export default class gameCanvas extends Component {
    constructor(params) {
        super({
            store,
            element: document.getElementById("gameCanvas"),
        });
        this.initStore();
        this.render();
        this.handleEvent();
        store.events.subscribe("leftUserScoreChange", async () => this.updateLeftUserScore());
        store.events.subscribe("rightUserScoreChange", async () => this.updateRightUserScore());
        // store.events.subscribe("ballPositionChange", async () => this.render());
        // store.events.subscribe("scoreChange", async () => this.render());
    }

    // TODO ThreeJS 맞춰서 좌표계 수정하기 - 중심을 (0, 0)으로
    /*
     *	{
     *		ballPosition: {
     *	    	x: 0,
     *	    	y: 0,
     *	 	},
     *	 	leftPaddlePosition: 0,
     *	 	rightPaddlePosition: 0,
     * 	}
     */
    initStore() {
        store.dispatch("initPositions", {
            ballPosition: {
                x: Game.CANVAS_WIDTH / 2,
                y: Game.CANVAS_HEIGHT / 2,
            },
            leftPaddlePosition: Game.CANVAS_HEIGHT / 2,
            rightPaddlePosition: Game.CANVAS_HEIGHT / 2,
        });
        store.dispatch("initScores");
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({canvas: this.element, antialias: true});
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#065535');

        const leftNicknameObject = createNicknameObject(store.state.gameContext.leftUser, Side.LEFT);
        const rightNicknameObject = createNicknameObject(store.state.gameContext.rightUser, Side.RIGHT);

        this.leftScoreObject = createScoreObject(store.state.leftUserScore, Side.LEFT);
        this.rightScoreObject = createScoreObject(store.state.rightUserScore, Side.RIGHT);

        this.scene.add(
            table,
            northWall,
            southWall,
            eastWall,
            westWall,
            ball,
            leftPaddle,
            rightPaddle,
            leftNicknameObject,
            rightNicknameObject,
            scoreSeparator,
            this.leftScoreObject,
            this.rightScoreObject
        );
    }

    initLighting() {
        const ambient = new THREE.AmbientLight(0xA0A0FC, 0.82);
        const sunLight = new THREE.DirectionalLight(0xE8C37B, 1.96);
        sunLight.position.set(-15, 40, 80);
        this.scene.add(ambient, sunLight);
    }

    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    setOrbitControlsLimits() {
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.04;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 100;
        this.controls.enableRotate = true;
        this.controls.enableZoom = true;
        this.controls.maxPolarAngle = Math.PI;
        this.controls.minAzimuthAngle = -Math.PI / 2;
        this.controls.maxAzimuthAngle = Math.PI / 2;
    }

    introAnimation() {
        this.controls.enabled = false //disable orbit controls to animate the camera

        const cameraTween = new TWEEN.Tween(this.camera.position.set(30, 30, -25))
            .to({x: 0, y: 0, z: 3.5}, 2500)
            .delay(1000)
            .easing(TWEEN.Easing.Quartic.InOut)
            .start();

        cameraTween.onComplete(() => {
            this.controls.enabled = true;
            this.setOrbitControlsLimits();
            TWEEN.remove(cameraTween);
        });
    }

    gameLoop() {
        leftPaddle.position.y = store.state.leftPaddlePosition / 100 - 2;
        rightPaddle.position.y = store.state.rightPaddlePosition / 100 - 2;

        ball.position.x = store.state.ballPosition.x / 100 - 4;
        ball.position.y = store.state.ballPosition.y / 100 - 2;

        TWEEN.update();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.gameLoop());
    }

    async render() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.initLighting();
        this.initControls();
        this.introAnimation();
        this.gameLoop();
        this.handleEvent();
        this.handleResize();
    }

    async handleEvent() {
        document.addEventListener("keydown", (e) => {
            if (store.state.gameStatus !== "playing") return;
            if (store.state.gameContext.participated === false) return;
            if (e.key == "ArrowUp") {
                store.dispatch("moveUserPaddleUp");
            } else if (e.key == "ArrowDown") {
                store.dispatch("moveUserPaddleDown");
            }
        });
    }

    async handleResize() {
        window.addEventListener('resize', () => {
            // Update camera aspect ratio
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }, false);
    }

    async updateLeftUserScore() {
        this.scene.remove(this.leftScoreObject);
        this.leftScoreObject = createScoreObject(store.state.leftUserScore, Side.LEFT);
        this.scene.add(this.leftScoreObject);
    }

    async updateRightUserScore() {
        this.scene.remove(this.rightScoreObject);
        this.rightScoreObject = createScoreObject(store.state.rightUserScore, Side.RIGHT);
        this.scene.add(this.rightScoreObject);
    }

    // async drawObjects() {
    //     this.ctx.fillStyle = "#000";
    //     this.ctx.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
    //     this.drawPaddle("left");
    //     this.drawPaddle("right");
    //     this.drawBall();
    // }
    //
    // async drawPaddle(side) {
    //     const x = side === "left" ? 0 : Game.CANVAS_WIDTH - Game.PADDLE_WIDTH;
    //     const y =
    //         side === "left"
    //             ? store.state.leftPaddlePosition
    //             : store.state.rightPaddlePosition;
    //
    //     this.ctx.beginPath();
    //     this.ctx.rect(
    //         x,
    //         y - Game.PADDLE_HEIGHT / 2,
    //         Game.PADDLE_WIDTH,
    //         Game.PADDLE_HEIGHT
    //     );
    //     this.ctx.fillStyle = "#FFF";
    //     this.ctx.fill();
    //     this.ctx.closePath();
    // }
    //
    // async drawBall() {
    //     const {x, y} = store.state.ballPosition;
    //     this.ctx.beginPath();
    //     this.ctx.arc(x, y, Game.BALL_RADIUS, 0, Math.PI * 2);
    //     this.ctx.fillStyle = "#FFF";
    //     this.ctx.fill();
    //     this.ctx.closePath();
    // }
    //
    // async drawScores() {
    //     this.ctx.font = "20px Arial";
    //
    //     const gameInfo = store.state.gameInfo;
    //     const leftDesignator = gameInfo.userSide === Side.LEFT ? "(Me)" : "";
    //     const rightDesignator = gameInfo.userSide === Side.RIGHT ? "(Me)" : "";
    //     const leftUserText = `${gameInfo.nickname[0]} ${leftDesignator}: ${store.state.leftUserScore}`;
    //     const rightUserText = `${gameInfo.nickname[1]} ${rightDesignator}: ${store.state.rightUserScore}`;
    //
    //     const leftUserTextX = 30;
    //     const rightUserTextX =
    //         Game.CANVAS_WIDTH - 30 - this.ctx.measureText(rightUserText).width;
    //     this.ctx.fillText(leftUserText, leftUserTextX, 30);
    //     this.ctx.fillText(rightUserText, rightUserTextX, 30);
    // }
}
