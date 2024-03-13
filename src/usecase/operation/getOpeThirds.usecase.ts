import { CODES } from '../../common/codes';
import { ORDERS } from '../../common/orders';
import { Inversify } from '../../common/inversify';
import { BackgroundServiceModel } from '../../service/background/model/background.service.model';
import { OperationThridUsecaseModel } from '../../usecase/operation/model/operationThrid.usecase.model';

export default class GetOpeThirdsUsecase {

  constructor(
    private inversify: Inversify,
  ) {}

  async execute(): Promise<OperationThridUsecaseModel[]> {
    const response:BackgroundServiceModel = await this.inversify.backgroundService.send({
      name: ORDERS.GET_OPE_THIRDS
    });

    if(response.message !== CODES.SUCCESS) {
      throw new Error(response.message);
    }

    return response.data;
  }
}