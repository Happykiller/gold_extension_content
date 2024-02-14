import config from './config';
import MediaService from '../services/media/media.service';
import MediaServiceChrome from '../services/media/media.service.chrome';
import MediaServiceBrowser from '../services/media/media.service.browser';
import BackgroundService from '../services/background/background.service';
import BackgroundServiceFake from '../services/background/background.service.fake';
import BackgroundServiceReal from '../services/background/background.service.real';

export class Inversify {
  backgroundService: BackgroundService;
  mediaService: MediaService;

  constructor() {
    // Usecases

    // Services
    if (config.app_env === 'prod') {
      this.backgroundService = new BackgroundServiceReal(chrome);
      this.mediaService = new MediaServiceChrome(chrome);
    } else {
      this.backgroundService = new BackgroundServiceFake();
      this.mediaService = new MediaServiceBrowser();
    }

  }
}

const inversify = new Inversify();

export default inversify;