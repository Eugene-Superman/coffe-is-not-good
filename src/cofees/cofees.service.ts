import { Injectable } from '@nestjs/common';
import { Coffe } from './entities/cofee.entity';

@Injectable()
export class CofeesService {
    private cofees: Coffe[] = [
        { id: 1, name: 'mac cofee', brand: 'mc', flavors: ['nuts', 'usual'] },
    ];

    getAll() {
        return this.cofees;
    }

    findOne(id: string) {
        return this.cofees.find((c) => c.id === +id);
    }

    create(createCofeeDto: any) {
        this.cofees.push(createCofeeDto);
        return createCofeeDto;
    }

    update(id: string, updateCofeeDto: any) {
        const indexToUpdate = this.cofees.findIndex((c) => c.id === +id);
        if (indexToUpdate > -1) {
            this.cofees[indexToUpdate] = {
                ...this.cofees[indexToUpdate],
                ...updateCofeeDto,
            };
        }
    }

    remove(id: string) {
        const indexToRemove = this.cofees.findIndex((c) => c.id === +id);
        if (indexToRemove > -1) {
            this.cofees.splice(indexToRemove, 1);
        }
    }
}
