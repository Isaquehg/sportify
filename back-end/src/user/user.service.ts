import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  userInfo() {
    return { email: 'test@email.com', name: 'test' };
  }
}
