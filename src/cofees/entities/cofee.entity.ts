import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // table name === 'cofee'
export class Cofee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    brand: string;

    @Column({ default: 0 })
    recommendations: number;

    @JoinTable()
    @ManyToMany(() => Flavor, (flavor) => flavor.cofees, { cascade: true })
    flavors: Flavor[];
}
