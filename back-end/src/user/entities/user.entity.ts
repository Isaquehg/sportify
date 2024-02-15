// src/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LocationEntity } from '../../location/entity/location.entity';
import { UsersOnTermineEntity } from '../../users-on-termine/entities/users-on-termine.entity';
import { TerminEntity } from 'src/termin/entities/termin.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  active: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date(), type: 'timestamp', onUpdate: 'now()' })
  updatedAt: Date;

  @OneToMany(() => LocationEntity, (location) => location.addedById)
  locations: LocationEntity[];

  @OneToMany(
    () => UsersOnTermineEntity,
    (usersOnTermine) => usersOnTermine.users,
  )
  termine: UsersOnTermineEntity[];

  @OneToMany(() => TerminEntity, (termin) => termin.createdBy)
  createdTermine: TerminEntity;
}
