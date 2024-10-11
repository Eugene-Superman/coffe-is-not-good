import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cofee } from './cofee.entity';

@Entity()
export class Flavor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Cofee, (cofee) => cofee.flavors)
    cofees: Cofee[];
}
