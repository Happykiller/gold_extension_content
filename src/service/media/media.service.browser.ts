import MediaService from './media.service';

export default class MediaServiceBrowser extends MediaService {
  getUrl(dto: string): string {
    return './medias/'+dto;
  }
}