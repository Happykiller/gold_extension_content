import { CODES } from '../../common/codes';
import { ORDERS } from '../../common/orders';
import { Inversify } from '../../common/inversify';
import { OperationUsecaseModel } from '../../usecase/operation/model/operation.usecase.model';
import { BackgroundServiceModel } from '../../service/background/model/background.service.model';
import { CreateOperationUsecaseDto } from '../../usecase/operation/dto/create.operation.usecase.dto';

export default class CreateOperationUsecase {

  constructor(
    private inversify: Inversify,
  ) {}

  async execute(dto: CreateOperationUsecaseDto): Promise<OperationUsecaseModel> {
    const response:BackgroundServiceModel = await this.inversify.backgroundService.send({
      name: ORDERS.CREATE_OPERATION,
      data: dto
    });

    if(response.message !== CODES.SUCCESS) {
      throw new Error(response.message);
    }

    return response.data;
  }
}