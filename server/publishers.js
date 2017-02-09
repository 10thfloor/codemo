import { check } from 'meteor/check';
import { StreamEditorContent } from '../imports/collections';

function publishStreamEditorContent(id) {
  if (!id) return this.ready();

  check(id, String);

  return StreamEditorContent.find(id, {
    fields: StreamEditorContent.publicFields,
  });
}

function publishAllStreams() {
  const RECENT_STREAM_LIMIT = 20;
  const queryParams = {
    sort: { _id: -1 },
    limit: RECENT_STREAM_LIMIT,
  };
  return StreamEditorContent.find({}, queryParams);
}

export {
  publishStreamEditorContent,
  publishAllStreams,
};
