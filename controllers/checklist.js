const mongoClient = require('../routes/mongo');

const _client = mongoClient.connect();

const initState = {
  userId: 'test',
  item: [
    { item: '0', checked: false },
    { item: '1', checked: false },
    { item: '2', checked: false },
    { item: '3', checked: false },
    { item: '4', checked: false },
  ],
};

const checkDB = {
  // 제일 처음 set data
  setData: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('checklist');
    const result = await db.insertOne(initState);
    if (result.acknowledged) {
      return '업데이트 성공';
    } else {
      throw new Error('통신 이상');
    }
  },
  // item 불러오기
  getItem: async () => {
    const client = await _client;
    const db = client.db('triplog').collection('checklist');
    const data = await db.find({}).toArray();
    return data;
  },
  // item 추가
  addItem: async (req) => {
    const client = await _client;
    const db = client.db('triplog').collection('checklist');
    const result = await db.insertOne(req);
    if (result.acknowledged) {
      return req;
    } else {
      throw new Error('통신 이상');
    }
  },
  // checked 변경
  checkedItem: async (el) => {
    const client = await _client;
    const db = client.db('triplog').collection('checklist');
    const result = await db.updateOne(
      { _id: el._id },
      { $set: { checked: el.checked } }
    );
    if (result.acknowledged) {
      return '업데이트 성공';
    } else {
      throw new Error('통신 이상');
    }
  },
  deleteItem: async (el) => {
    const client = await _client;
    const db = client.db('triplog').collection('checklist');
    const result = await db.deleteOne({ _id: el._id });
    if (result.acknowledged) {
      return _id;
    } else {
      throw new Error('통신 이상');
    }
  },
};

module.exports = checkDB;
