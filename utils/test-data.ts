export const TEST_CREDENTIALS = {
  valid: {
    email: 'bacos38210@aixind.com',
    password: '123123',
  },
  invalid: {
    wrongEmail: 'wrong@email.com',
    wrongPassword: 'wrongpassword',
    invalidEmail: 'notanemail',
    emptyEmail: '',
    emptyPassword: '',
  },
};

export const PROJECT_DATA = {
  valid: {
    name: `Test Project ${Date.now()}`,
    description: 'This is a test project created by automation',
  },
  invalid: {
    emptyName: '',
    longName: 'A'.repeat(256),
  },
};

export const ERROR_MESSAGES = {
  invalidEmail: 'Please enter a valid email address',
  requiredField: 'This field is required',
  invalidCredentials: 'Invalid email or password',
};

