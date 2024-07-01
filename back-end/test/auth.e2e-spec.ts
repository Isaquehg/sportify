import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import mongoose from 'mongoose';

describe('Authentication Endpoints (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string; // Variable to store JWT token

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should register new user (POST)', () => {
    let randomName: string = generateRandomName();
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: randomName,
        email: randomName + "@email.com",
        password: '12345678910'
      })
      .expect(201);
  });

  it('Should signin user (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'CleverLion1719841986079@email.com',
        password: '12345678910'
      })
      .expect(201);
    
    // Store the JWT token for later use
    jwtToken = response.body.token;
    expect(jwtToken).toBeDefined();
  });

  it('Should get Hello (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Bearer ${jwtToken}`) // Set JWT token in the Authorization header
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
    await mongoose.disconnect(); // Close Mongoose connection
  });

  function generateRandomName() {
    const adjectives = ['Happy', 'Clever', 'Brave', 'Kind', 'Wise', 'Gentle', 'Strong', 'Lucky', 'Bright', 'Joyful', 'Wild'];
    const nouns = ['Cat', 'Dog', 'Bird', 'Tiger', 'Lion', 'Bear', 'Fox', 'Elephant', 'Dolphin', 'Wolf', 'Raccoon'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const currentTime = new Date();
    const timestamp = currentTime.getTime(); // Using timestamps
  
    return `${randomAdjective}${randomNoun}${timestamp}`;
  }
});
