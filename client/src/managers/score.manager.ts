import Container, { Service } from "typedi";
import { EventManager } from "./event.manager";

@Service()
export class ScoreManager {
    private _scene: Phaser.Scene;
    private _score: number = 0;
    private scoreText: Phaser.GameObjects.Text;
    private livesText: Phaser.GameObjects.Text;
    private starterLives: number = 3;
    private currentLives: number = this.starterLives;
    private healthBar: Phaser.GameObjects.Image;
    private lifeImages: Array<Phaser.GameObjects.Image> = [];
    private health = 100; // 50, 25, 0

    private eventManager: EventManager = Container.get(EventManager);

    get scene() { return this._scene; }
    get score() { return this._score; }
    set score(value: number) { this._score = value; }
    
    preload() {
    }

    init(scene: Phaser.Scene) {
        this._scene = scene;
    }

    create() {
        this.initScore();
        this.initHealthBar();
        this.initLives();
    }

    update() {

    }

    addScore(value: number) {
        this.score += value;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    resetScore() {
        this.score = 0;
    }

    damageHealth() {
        if (this.health == 100) {
            this.health = 50;
            this.updateHealthbar('halfhealth');
            return;
        }

        if (this.health == 50) {
            this.health = 25;
            this.updateHealthbar('lowhealth');
            return;
        }

        if (this.health == 25 && this.currentLives > 0) {
            this.health = 100;
            this.currentLives -= 1;
            this.updateHealthbar('fullhealth');
            this.updateLives();
            return;
        }

        if (this.health == 25 && this.currentLives == 0) {
            this.updateHealthbar('emptyhealth');
            this.scene.physics.pause();
            this.eventManager.gameState$.next('PAUSE');
            //game over event
            return;
        }
    }

    private updateLives() {
        this.lifeImages.forEach(o => o.destroy());
        for(let i = 0; i < this.currentLives; i++) {
            let position = i * 20;
            let image = this.scene.add.image((window.innerWidth - 225) - position, 12, 'heart');
            image.setDepth(5);
            image.setScale(1/2)
            this.lifeImages.push(image);
        }
    }

    private updateHealthbar(imageName) {
        this.healthBar?.destroy();
        this.healthBar = this.scene.add.image(window.innerWidth - 118, 12, imageName);
        this.healthBar.setScale(1/2);
        this.healthBar.setDepth(5);
    }

    private initScore() {
        this.scoreText = this._scene.add.text(10, 5, `Score: ${this.score}`, { fontFamily: 'Arcade', fontSize: 'px' });
        this.scoreText.scrollFactorX = 0;
        this.scoreText.scrollFactorY = 0;
        this.scoreText.setFontSize(12);
        this.scoreText.setDepth(5);
    }

    private initHealthBar() {
        this.healthBar = this.scene.add.image(window.innerWidth - 118, 12, 'fullhealth');
        this.healthBar.setScale(1/2);
        this.healthBar.setDepth(5);
    }

    private initLives() {
        for(let i = 0; i < this.starterLives; i++) {
            let position = i * 20;
            let image = this.scene.add.image((window.innerWidth - 225) - position, 12, 'heart');
            image.setDepth(5);
            image.setScale(1/2)
            this.lifeImages.push(image);
        }
    }
}