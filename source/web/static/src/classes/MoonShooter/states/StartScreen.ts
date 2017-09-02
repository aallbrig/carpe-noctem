import { State } from 'phaser';
const kenneyThemeAssetJson = require('kenney-theme/kenney-theme.json');

export class StartScreen extends State {
    private slickUi:any;
    public preload() {
        this.slickUi = this.game.plugins.add((Phaser.Plugin as any).SlickUI);
        console.log('kenneyThemeAssetJson', kenneyThemeAssetJson);
        // this.slickUi.load(kenneyThemeAssetJson);
    }
    public create() {
        // var panel;
        // this.slickUi.add(panel = new SlickUI.Element.Panel(8, 8, this.game.width - 16, this.game.height - 16));
        // panel.add(new SlickUI.Element.Text(10,10, "Text input")).centerHorizontally().text.alpha = 0.5;
        // panel.add(new SlickUI.Element.Text(12,34, "Your name"));
        // var textField = panel.add(new SlickUI.Element.TextField(10,58, panel.width - 20, 40));
        // textField.events.onOK.add(function () {
        //     alert('Your name is: ' + textField.value);
        // });
        // textField.events.onToggle.add(function (open: any) {
        //     console.log('You just ' + (open ? 'opened' : 'closed') + ' the virtual keyboard');
        // });
        // textField.events.onKeyPress.add(function(key: any) {
        //     console.log('You pressed: ' + key);
        // });
    }
    public update() {
        if (
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)
            || this.game.input.pointer1.isDown
            || this.game.input.mousePointer.isDown
        ) {
            this.game.state.start('game');
        }
    }
}

export default StartScreen;
