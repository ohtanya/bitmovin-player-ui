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

    const fullscreenStateHandler = () => {
      player.getViewMode() === player.exports.ViewMode.Fullscreen ? this.hide() : this.show();
    };

    player.on(player.exports.PlayerEvent.ViewModeChanged, fullscreenStateHandler);
    const fullwindowTarget = uimanager.getConfig().fullwindowTarget;
    const body = document.getElementsByTagName('body')[0];
    const targetNode = <Element>fullwindowTarget || body;

    // const targetNode = typeof fullwindowTarget === 'node' ? fullwindowTarget : body;
    const fullwindowClass = this.prefixCss('fullwindow');

    this.onClick.subscribe(() => {
      if (targetNode.classList.contains(fullwindowClass)) {
        this.off();
        targetNode.classList.remove(fullwindowClass);
      } else {
        this.on();
        targetNode.classList.add(fullwindowClass);
      }
    });
  }
}
