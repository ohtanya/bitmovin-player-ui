import { ToggleButton, ToggleButtonConfig } from './togglebutton';
import { UIInstanceManager } from '../uimanager';
import { PlayerAPI } from 'bitmovin-player';
import { i18n } from '../localization/i18n';

/**
 * A button that toggles the player between windowed and fullwindow view.
 */
export class FullwindowToggleButton extends ToggleButton<ToggleButtonConfig> {

  constructor(config: ToggleButtonConfig = {}) {
    super(config);

    this.config = this.mergeConfig(config, {
      cssClass: 'ui-fullwindowtogglebutton',
      text: i18n.getLocalizer('fullwindow'),
    }, this.config);
  }

  configure(player: PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);

    const toggle = () => {
      const targetNode = document.getElementsByTagName('body')[0];
      const fullwindowClass = this.prefixCss('fullwindow');
      if (targetNode.classList.contains(fullwindowClass)) {
        this.off();
        targetNode.classList.remove(fullwindowClass);
      } else {
        this.on();
        targetNode.classList.add(fullwindowClass);
      }
    };

    this.onClick.subscribe(toggle);
  }
}
