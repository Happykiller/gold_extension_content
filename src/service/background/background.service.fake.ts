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
    } else if (dto.name === ORDERS.CREATE_OPERATION) {
      /* istanbul ignore next */
      if (true) {
        response = {
          message: CODES.SUCCESS,
          data: {
            id: 1,
            account_id: 1,
            account_id_dest: null,
            amount: 60,
            date: "2024-01-31",
            status_id: 2,
            type_id: 2,
            third_id: 2,
            category_id: 8,
            description: "Voyage illidan vers bordeaux",
            creator_id: 1,
            creation_date: "1708016596016",
            modificator_id: null,
            modification_date: null
          }
        };
      } else {
        /* istanbul ignore next */
        response = {
          message: CODES.CREATE_OPERATION_FAIL
        };
      }
    } else {
      throw new Error('order not implemented')
    }
    
    return Promise.resolve(response as BackgroundServiceModel);
  }
}