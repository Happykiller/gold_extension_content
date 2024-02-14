import { CODES } from '../../common/codes';
import { ORDERS } from '../../common/orders';
import BackgroundService from './background.service';
import { BackgroundServiceDto } from '../dtos/background.service.dto';
import { BackgroundServiceModel } from '../models/background.service.model';

export default class BackgroundServiceFake extends BackgroundService {

  async send(dto: BackgroundServiceDto): Promise<BackgroundServiceModel> {
    let response;
    if (dto.name === ORDERS.HELLO) {
      /* istanbul ignore next */
      if (true) {
        /* istanbul ignore next */
        response = {
          message: CODES.SUCCESS,
          data: 'Coucou'
        }
      } else {
        response =  {
          message: CODES.FAIL
        }
      }
    } else {
      throw new Error('order not implemented')
    }
    
    return Promise.resolve(response as BackgroundServiceModel);
  }
}