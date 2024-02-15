import { Injectable } from '@nestjs/common';
import { CreateTerminDto } from './dto/create-termin.dto';
import { UpdateTerminDto } from './dto/update-termin.dto';
import { PrismaClient, Termin } from '@prisma/client';

@Injectable()
export class TerminService {
  constructor(private prismaClient: PrismaClient) { }

  async create(
    userID: number,
    locationID: number,
    createTerminDto: CreateTerminDto,
  ): Promise<Termin | null> {
    try {
      const errors: string[] = [];

      // Validate required fields
      if (!createTerminDto.sport) {
        errors.push('Sport is required.');
      }
      if (!locationID) {
        errors.push('Location ID is required.');
      }
      if (!userID) {
        errors.push('User ID is required.');
      }
      if (!createTerminDto.startAt) {
        errors.push('Start date and time are required.');
      }
      if (!createTerminDto.endAt) {
        errors.push('End date and time are required.');
      }

      // Verify Termin start and end date
      if (createTerminDto.startAt >= createTerminDto.endAt) {
        errors.push('Start date and time must be before end date and time.');
      }

      if (errors.length > 0) {
        throw new Error('Invalid Termin data: ' + errors.join(', '));
      }

      // 2. Ensure a relationship exists between User and Location
      const associatedLocation = await this.prismaClient.location.findUnique({
        where: { id: locationID },
        include: { addedBy: true },
      });

      if (!associatedLocation || associatedLocation.addedById !== userID) {
        throw new Error(
          'Invalid user-location relationship for creating Termin',
        );
      }

      // 3. Create the Termin record
      const createdTermin = await this.prismaClient.termin.create({
        data: {
          ...createTerminDto, // Unpack properties from the DTO
          location: { connect: { id: locationID } }, // Connect to Location
          createdBy: { connect: { id: userID } }, // Connect to User
        },
      });

      // 4. Handle related record creation (UsersOnTermine)
      await this.prismaClient.usersOnTermine.create({
        data: {
          users: { connect: { id: userID } }, // Connect to the creating User
          termine: { connect: { id: createdTermin.id } }, // Connect to the created Termin
        },
      });

      return createdTermin;
    } catch (error) {
      console.error('Error creating Termin:', error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all termine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} termin`;
  }

  update(id: number, updateTerminDto: UpdateTerminDto) {
    return `This action updates a #${id} termin`;
  }

  async remove(id: number) {
    try {
      const deletedTermin = await this.prismaClient.termin.delete({
        where: { id }, // Filter by the specified ID
      });
      console.log(`Termin with ID ${id} deleted successfully.`);
      return deletedTermin;
    } catch (error) {
      console.error('Error deleting Termin:', error);
      throw error;
    }
  }

  findUserTermineInALocation(params: string[]) {
    throw new Error('Method not implemented.');
  }
  findAllTermineOfAUser(id: string) {
    throw new Error('Method not implemented.');
  }
  findAllInOneLocation(arg0: number) {
    throw new Error('Method not implemented.');
  }
}
