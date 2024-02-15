import { TerminEntity } from 'src/termin/entities/termin.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersOnTermineEntity {
  @PrimaryGeneratedColumn()
  id: number; // Optional for compatibility with Prisma's composite ID

  @ManyToOne(() => UserEntity, (user) => user.termine)
  @JoinColumn({ name: 'userId' })
  users: UserEntity;

  @ManyToOne(() => TerminEntity, (termin) => termin.users)
  @JoinColumn({ name: 'terminId' })
  termine: TerminEntity;
}
