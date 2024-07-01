import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';

describe('Event Endpoints (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let eventId: string;
  let eventSport = generateRandomName();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Getting JWT Token before requests
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'larry@email.com',
        password: '12345678910'
      });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await app.close();
  });

  it('Should create an event (POST)', async () => {
    const startAt = new Date(); 
    const endAt = generateRandomTimestamp(startAt, new Date(startAt.getTime() + (24 * 60 * 60 * 1000)));

    const response = await request(app.getHttpServer())
    .post('/event/create')
    .set('Authorization', `Bearer ${token}`)
    .send({
      sport: eventSport,
      status: true,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      participants: [
        { userId: '611f0554c3c20f47982a9e55' },
        { userId: '663a396ed521a7ac74fd263b' }
      ],
      location: { type: 'Point', coordinates: [-73.856077, 40.848447] },
      maxParticipants: 4
    })

    eventId = response.body._id

    expect(response.status).toBe(201);
  });

  it('Should see open events (GET)', () => {
    return request(app.getHttpServer())
      .get('/event/open')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Should get details of a specific event (GET)', () => {
    return request(app.getHttpServer())
      .get('/event/663929489bbf07ae9b7815bb')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Should register for an event (POST)', () => {
    return request(app.getHttpServer())
      .post(`/event/${eventId}/register`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: '663a2e83b973c4264623cd9a'
      })
      .expect(201);
  });

  it('Should unregister from an event (POST)', () => {
    return request(app.getHttpServer())
      .post(`/event/${eventId}/unregister`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: '611f0554c3c20f47982a9e55'
      })
      .expect(201);
  });

  it('Should close an event (POST)', () => {
    return request(app.getHttpServer())
      .post(`/event/${eventId}/close`)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);
  });

  it('Should see open events from specific sport (GET)', () => {
    return request(app.getHttpServer())
      .get(`/event/open/${encodeURIComponent(eventSport)}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  function generateRandomName() {
    const adjectives = ['Happy', 'Clever', 'Brave', 'Kind', 'Wise', 'Gentle', 'Strong', 'Lucky', 'Bright', 'Joyful'];
    const nouns = ['Cat', 'Dog', 'Bird', 'Tiger', 'Lion', 'Bear', 'Fox', 'Elephant', 'Dolphin', 'Wolf'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const currentTime = new Date();
    const timestamp = currentTime.getTime();
  
    return `${randomAdjective}${randomNoun}${timestamp}`;
  }

  function generateRandomTimestamp(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
});
