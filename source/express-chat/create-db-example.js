'use strict';

const { MongoClient } = require('mongodb');

const DB_NAME = 'chat';
const URL = 'mongodb://localhost:27017';

const client = new MongoClient(URL, { useUnifiedTopology: true });

client.connect(async (error) => {
  if (error) {
    throw error;
  }

  console.log('Connected successfully to server');

  const db = client.db(DB_NAME);

  const collection = db.collection('test_insert');

  const docs = await collection.insertOne({ a: 1 });

  const count = await collection.estimatedDocumentCount();
  console.log('count:', count);

  const cursor = collection.find({ a: 2 });
  const results = await cursor.toArray();
  console.log('results:', results);

  client.close();
});
