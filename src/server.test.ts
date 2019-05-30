import start from './server';

describe('Test placeholder', () => {
  it('should hold the place', () => {
    expect(typeof start).toBe('function');
  });
});
