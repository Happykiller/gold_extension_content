import config from '../common/config';
import MediaService from '../service/media/media.service';
import MediaServiceChrome from '../service/media/media.service.chrome';
import MediaServiceBrowser from '../service/media/media.service.browser';
import BackgroundService from '../service/background/background.service';
import GetOpeThirdsUsecase from '../usecase/operation/getOpeThirds.usecase';
import BackgroundServiceFake from '../service/background/background.service.fake';
import BackgroundServiceReal from '../service/background/background.service.real';
import GetOpeCategoriesUsecase from '../usecase/operation/getOpeCategories.usecase';

export class Inversify {
  mediaService: MediaService;
  backgroundService: BackgroundService;
  getOpeThirdsUsecase: GetOpeThirdsUsecase;
  getOpeCategoriesUsecase: GetOpeCategoriesUsecase;

  constructor() {
    // Usecases
    this.getOpeThirdsUsecase = new GetOpeThirdsUsecase(this);
    this.getOpeCategoriesUsecase = new GetOpeCategoriesUsecase(this);

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