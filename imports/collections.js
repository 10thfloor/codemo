const StreamEditorContent = new Mongo.Collection('streameditorcontent');

StreamEditorContent.publicFields = {
  _id: 1,
  text: 1,
  mode: 1,
  name: 1,
};

const StreamUsers = new Mongo.Collection('streamusers');

export {
  StreamEditorContent,
  StreamUsers,
};
