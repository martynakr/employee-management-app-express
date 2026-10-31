import { beforeAll, afterAll, beforeEach } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { afterEach } from "vitest";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
    const collections = mongoose.connection.collections;

    for (const [name, collection] of Object.entries(collections)) {
        await collection.deleteMany({});
        // console.log(`${name}:`, await collection.countDocuments());
    }
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
