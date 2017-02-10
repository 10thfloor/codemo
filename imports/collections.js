const StreamEditorContent = new Mongo.Collection('streameditorcontent');

StreamEditorContent.publicFields = {
  _id: 1,
  text: 1,
  mode: 1,
  name: 1,
  owner: 1,
  leader: 1,
  users: 1,
};

const StreamUsers = new Mongo.Collection('streamusers');

export {
  StreamEditorContent,
  StreamUsers,
};
