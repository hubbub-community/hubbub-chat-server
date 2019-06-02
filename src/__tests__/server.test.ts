// const path = require('path');
// const { start } = require(path.resolve('./src/server.js'));
//
// const log = jest.spyOn(global.console, 'log').mockImplementation(() => {});
// const error = jest.spyOn(global.console, 'error').mockImplementation(() => {});
//

import start from '../server'

describe('`start` method', () => {
  xit('should be good', () => {
    expect(true).toBeTruthy()
  })
  //  it('should log twice on a successful start', () => {
  //    const port = 3000;
  //    start(port);
  //    // Actually it should call the server listen method
  //    // and then... logs.
  //    // Might need a mock implementation for this.
  //    expect(log).toHaveBeenCalledTimes(2);
  //  });
  //  it('should error log on an error', () => {
  //    expect(error).toHaveBeenCalledTimes(1);
  //  });
})
