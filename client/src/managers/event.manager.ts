//purpose of class is to manager rxjs messages
import { Subject } from 'rxjs';
import { Service } from 'typedi';
import { BaseEnemy } from '../entity/base.enemy';
import { EnemyEnum } from '../utils/enemy.enum';

@Service()
export class EventManager {

    public gameState$: Subject<'PAUSE' | 'PLAYING'> = new Subject<any>();
    public laserDestroyed$: Subject<any> = new Subject<any>();
    public createEnemy$: Subject<
    {
        position: Phaser.Math.Vector2,
        count: number,
        enemy?: EnemyEnum
    }> = new Subject();

    public updateScore$: Subject<number> = new Subject<number>();
    public laserFired$: Subject<{laser: Phaser.Types.Physics.Arcade.GameObjectWithBody}> = new Subject<any>();
    public enemyCreated$: Subject<Array<BaseEnemy>> = new Subject<Array<BaseEnemy>>();
    public playerEnemyCollison$: Subject<
        {player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
        enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody}> = new Subject<any>();

    constructor() {

    }
}