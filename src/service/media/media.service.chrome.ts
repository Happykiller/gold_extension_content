import MediaService from './media.service';

export default class MediaServiceChrome extends MediaService {

  constructor(
    private chrome: any,
  ) {
    super();
  }

  getUrl(dto: string): string {
    return this.chrome.runtime.getURL('medias/'+dto);
  }
}