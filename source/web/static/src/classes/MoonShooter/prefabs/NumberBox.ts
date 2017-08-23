import { Game, Text } from 'phaser';
export default class NumberBox extends Phaser.Group {
    private txtValue: Text;
    constructor(game: Game, bgasset: string, val: number) {
        super(game);
        
        this.create(0, 0, bgasset);
        const style = {
            font: '30px Arial', align: 'center', fill: '#fff'
        };
        this.txtValue = new Phaser.Text(this.game, 55, 55, val.toString(), style);
        this.txtValue.anchor.setTo(.5, .5);
        this.add(this.txtValue);
    }
    public setValue(val: number) {
        this.txtValue.text = val.toString();
    }
}
