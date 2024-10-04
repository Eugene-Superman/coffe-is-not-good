import { Test, TestingModule } from '@nestjs/testing';
import { CofeesController } from './cofees.controller';

describe('CofeesController', () => {
  let controller: CofeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CofeesController],
    }).compile();

    controller = module.get<CofeesController>(CofeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
