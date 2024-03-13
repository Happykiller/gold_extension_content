import { BackgroundServiceDto } from '../dtos/background.service.dto';
import { BackgroundServiceModel } from '../models/background.service.model';

export default abstract class BackgroundService {
  abstract send(dto: BackgroundServiceDto): Promise<BackgroundServiceModel>;
}