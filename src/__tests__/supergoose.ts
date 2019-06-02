/**
 * Combines SuperTest and Mongoose Memory Server
 * to reduce the pain of testing a Mongoose API
 */

import { Server } from 'http'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest, { SuperTest, Test } from 'supertest'

let mongoServer: any

/** @class SuperGoose */
class SuperGoose {
  /** An instance of MongoMemoryServer */
  //  public mongoServer: MongoMemoryServer
  // constructor() {}

  /**
   * Instantiate a mock request
   * @param server An Express server
   */
  public mockRequest(server: Server): SuperTest<Test> {
    return supertest(server)
  }

  /** Typically used in Jest `beforeAll` hook */
  public async startDB(): Promise<void> {
    mongoServer = new MongoMemoryServer()
    const mongoUri: string = await mongoServer.getConnectionString()

    const mongooseOptions: object = {
      useCreateIndex: true,
      useNewUrlParser: true,
    }

    await mongoose.connect(mongoUri, mongooseOptions, err => {
      if (err) {
        console.error(err)
      }
    })
  }

  /** Typically used in Jest `afterAll` hook */
  public stopDB(): void {
    mongoose.disconnect()
    mongoServer.stop()
  }
}

export default new SuperGoose()
