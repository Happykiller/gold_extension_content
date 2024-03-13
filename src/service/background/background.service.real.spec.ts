import { describe, expect } from '@jest/globals';
import { mock, MockProxy } from 'jest-mock-extended';

import BackgroundServiceReal from './background.service.real';
import { BackgroundServiceModel } from '../models/background.service.model';

describe('BackgroundServiceReal', () => {
  const mockChrome: MockProxy<any> = mock<any>();

  const service: BackgroundServiceReal = new BackgroundServiceReal(mockChrome);

  describe('#execute', () => {

    it('should build', () => {
      // arrange
      // act
      // assert
      expect(service).toBeDefined();
    });

    it('should get response for order test', async () => {
      // arrange
      mockChrome.runtime = {
        sendMessage: jest.fn((data, callback) => callback('someData'))
      };
      // act
      const response:BackgroundServiceModel = await service.send({
        name: 'test'
      });
      // assert
      expect(response).toEqual('someData');
    });

    it('should get response for order test with fail', async () => {
      // arrange
      mockChrome.runtime = {
        sendMessage: jest.fn((data, callback) => {
          throw new Error('error')
        })
      };
      // act
      let error;
      try {
        await service.send({
          name: 'test'
        });
      } catch (e) {
        error = e;
      }
      // assert
      expect(error).toStrictEqual(new Error('error'));
    });

  });
});