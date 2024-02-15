import { TerminEntity } from 'src/termin/entities/termin.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  adress: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column({ nullable: true })
  observation: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column('text', { array: true })
  sportsList: string[];

  @ManyToOne(() => UserEntity, (user) => user.locations)
  @JoinColumn({ name: 'addedById' })
  addedById: UserEntity;

  @OneToMany(() => TerminEntity, (termin) => termin.location)
  termine: TerminEntity;
}
