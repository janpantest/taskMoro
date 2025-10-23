// run-k6.js
require('dotenv').config(); // Load environment variables from .env file
const { execSync } = require('child_process');

// Retrieve values from .env file
const BASE_URL = process.env.BASE_URL;

// Log to confirm values are loaded
// console.log('Base URL:', BASE_URL_BOOK);
// console.log('Username:', TEST_USER);
// console.log('Password:', PASSWORD);

// Run k6 test with environment variables using cross-env via npx
execSync(`npx cross-env BASE_URL=${BASE_URL} k6 run test/api-be-moro.js`, { stdio: 'inherit' });
