export default class GameEntity {
  constructor(
    public x:number,
    public y:number,
    public dx:number = 0,
    public dy:number = 0
  ) {
    console.log('Game entity created!');
  }
  update():void {
    return console.log('update!');
  }
};
