import casual from 'casual';

// seed it so we get consistent results
casual.seed(777);

const fakeCharity = () => ({
  __typename: 'Charity',
  id: casual.uuid,
  ein: casual.uuid,
  name: casual.company_name,
  description: casual.description,
  website: casual.url,
  image: `${casual.word}.png`,
  largeImage: `${casual.word}.png`,
  imageDescription: casual.description,
  street: casual.street,
  city: casual.city,
  state: casual.state,
  zip: casual.zip,
  user: casual.uuid,
});

const fakeUser = () => ({
  __typename: 'User',
  id: casual.uuid,
  name: casual.name,
  email: casual.email,
  password: casual.password,
  totalDonated: casual.random,
  permissions: ['ADMIN'],
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export {
  LocalStorageMock,
  fakeCharity,
  fakeUser,
};
