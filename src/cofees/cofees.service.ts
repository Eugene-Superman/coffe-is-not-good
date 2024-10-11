import { Injectable, NotFoundException } from '@nestjs/common';
import { Cofee } from './entities/cofee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCofeeDto } from './dto/create-cofee.dto';
import { UpdateCofeeDto } from './dto/update-cofee.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Event } from '../events/enities/event.entity';

@Injectable()
export class CofeesService {
    constructor(
        @InjectRepository(Cofee)
        private readonly cofeeRepository: Repository<Cofee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
        private readonly dataSource: DataSource,
    ) {}

    getAll(paginationQueryDto: PaginationQueryDto) {
        const { limit, offset } = paginationQueryDto;
        return this.cofeeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: string) {
        const cofee = await this.cofeeRepository.findOne({
            where: {
                id: +id,
            },
            relations: ['flavors'],
        });
        if (!cofee) {
            throw new NotFoundException(`Coffe with id ${id} not found`);
        }
        return cofee;
    }

    async create(createCofeeDto: CreateCofeeDto) {
        const flavors = await Promise.all(
            createCofeeDto.flavors.map((f) => this.preloadFlavorByName(f)),
        );
        const cofee = this.cofeeRepository.create({
            ...createCofeeDto,
            flavors,
        });
        return this.cofeeRepository.save(cofee);
    }

    async update(id: string, updateCofeeDto: UpdateCofeeDto) {
        const flavors =
            updateCofeeDto.flavors &&
            (await Promise.all(
                updateCofeeDto.flavors.map((f) => this.preloadFlavorByName(f)),
            ));

        const cofee = await this.cofeeRepository.preload({
            id: +id,
            flavors,
        });

        if (!cofee) {
            throw new NotFoundException(`Coffe with id ${id} not found`);
        }

        return this.cofeeRepository.save(cofee);
    }

    async remove(id: string) {
        const cofee = await this.findOne(id);
        this.cofeeRepository.remove(cofee);
    }

    private async preloadFlavorByName(name: string) {
        const flavor = await this.flavorRepository.findOne({ where: { name } });
        if (flavor) {
            return flavor;
        }

        return this.flavorRepository.create({ name });
    }

    async recommendCoffe(cofee: Cofee) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            cofee.recommendations++;

            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_cofeee';
            recommendEvent.type = 'cofee';
            recommendEvent.payload = { coffeeId: cofee.id };

            await queryRunner.manager.save(cofee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
