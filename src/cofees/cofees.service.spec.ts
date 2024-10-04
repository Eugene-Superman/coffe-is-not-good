import { Test, TestingModule } from '@nestjs/testing';
import { CofeesService } from './cofees.service';

describe('CofeesService', () => {
  let service: CofeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CofeesService],
    }).compile();

    service = module.get<CofeesService>(CofeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
