/**
 * Combines SuperTest and Mongoose Memory Server
 * to reduce the pain of testing a Mongoose API
 */

import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest, { SuperTest, Test } from 'supertest'

/** @class SuperGoose */
class SuperGoose {
  /** A SuperTest mock server */
  public server: SuperTest<Test>
  /** An instance of MongoMemoryServer */
  public mongoServer: MongoMemoryServer
  /** Instantiate an instance of SuperGoose with an Express server */
  constructor(server: SuperTest<Test>) {
    this.server = supertest(server)
    this.mongoServer = new MongoMemoryServer()
  }

  /** Typically used in Jest `beforeAll` hook */
  public async startDB(): Promise<void> {
    const mongoUri: string = await this.mongoServer.getConnectionString()

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
    this.mongoServer.stop()
  }
}

export default SuperGoose
