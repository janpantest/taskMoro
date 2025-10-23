import http from 'k6/http';
import { sleep } from 'k6';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { createTask } from '../payloads/createTask.js';
import { checkAllKeysExist } from '../helpers/expects.js';
import { keys } from '../constants/keys.js';

export const options = {
  vus: 1,
  duration: '1s'
}

export default function() {
  const baseUrl = __ENV.BASE_URL;

  let taskId;
  let response;
  const taskName = `Task_${Math.floor(Math.random() * 10000)}`;
  let numberOfIds;
  let responseBody;

  describe('Get all tasks', () => {
    response = http.get(`${baseUrl}/tasks`);

    responseBody = JSON.parse(response.body);

    numberOfIds = responseBody.length;
    expect(responseBody.length, 'Body not to be empty').to.be.greaterThan(0);
    expect(response.status, 'response status').to.equal(200);
    sleep(1);
  });

  describe('Create new task', () => {
    response = http.post(`${baseUrl}/tasks`, JSON.stringify(createTask(`${taskName}`)), {
      headers: { 'Content-Type': 'application/json' },
      }
    );

    responseBody = JSON.parse(response.body);
    taskId = responseBody.id;

    expect(response.status, 'response status').to.equal(200);
    expect(responseBody.text, 'Task name').to.equal(taskName);
    checkAllKeysExist(responseBody, keys);
    sleep(1);
  });

  describe('Update new task', () => {
    response = http.post(`${baseUrl}/tasks/${taskId}`, JSON.stringify(createTask(`${taskName}_updated`)), {
      headers: { 'Content-Type': 'application/json' },
      }
    );

    responseBody = JSON.parse(response.body);

    expect(response.status, 'response status').to.equal(200);
    expect(responseBody.text, 'Task name').to.equal(`${taskName}_updated`);
    checkAllKeysExist(responseBody, keys);

    sleep(1);
  });

  describe('Delete new task', () => {
  response = http.del(`${baseUrl}/tasks/${taskId}`);
  

  expect(response.status, 'response status').to.equal(200);
  expect(response.headers['Content-Length'], 'Content-Length').to.equal('0');
  sleep(1);
  });
}