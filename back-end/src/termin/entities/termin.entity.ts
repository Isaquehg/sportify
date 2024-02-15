import { LocationEntity } from 'src/location/entity/location.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UsersOnTermineEntity } from 'src/users-on-termine/entities/users-on-termine.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TerminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sport: string;

  @Column()
  startAt: Date;

  @Column()
  endAt: Date;

  @OneToMany(
    () => UsersOnTermineEntity,
    (UsersOnTermine) => UsersOnTermine.termine,
  )
  users: UsersOnTermineEntity;

  @OneToMany(() => LocationEntity, (location) => location.termine)
  @JoinColumn({ name: 'locationId' })
  location: LocationEntity;

  @ManyToOne(() => UserEntity, (user) => user.createdTermine)
  @JoinColumn({ name: 'userId' })
  createdBy: UserEntity;
}
