import {ContainerConfig, Container} from './container';
import {UIInstanceManager} from '../uimanager';
import {Component, ComponentConfig} from './component';
import {Timeout} from '../timeout';
import { PlayerAPI } from 'bitmovin-player';

/**
 * Configuration interface for the {@link BufferingOverlay} component.
 */
export interface DLXWatermarkOverlayConfig extends ContainerConfig {
  /**
   * Delay in milliseconds after which the buffering overlay will be displayed. Useful to bypass short stalls without
   * displaying the overlay. Set to 0 to display the overlay instantly.
   * Default: 1000ms (1 second)
   */
    showDelayMs?: number;
}

/**
 * Overlays the player and displays a buffering indicator.
 */
export class DLXWatermarkOverlay extends Container<DLXWatermarkOverlayConfig> {

  private indicators: Component<ComponentConfig>[];

  constructor(config: DLXWatermarkOverlayConfig = {}) {
    super(config);

    this.config = this.mergeConfig(config, <DLXWatermarkOverlayConfig>{
      cssClass: 'ui-dlx-watermark-overlay',
      hidden: false,
    }, this.config);
  }

  configure(player: PlayerAPI, uimanager: UIInstanceManager): void {
    super.configure(player, uimanager);
  }
}
