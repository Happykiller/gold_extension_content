import { ORDERS } from '../../common/orders';
import BackgroundServiceFake from './background.service.fake';
import { BackgroundServiceModel } from '../models/background.service.model';

describe('BackgroundServiceFake', () => {
  const service: BackgroundServiceFake = new BackgroundServiceFake();

  describe('#execute', () => {

    it('should build', () => {
      // arrange
      // act
      // assert
      expect(service).toBeDefined();
    });

    it('should get response for order getSession', async () => {
      // arrange
      // act
      const response:BackgroundServiceModel = await service.send({
        name: ORDERS.HELLO
      });
      // assert
      expect(response).toEqual('hello');
    });

  });
});