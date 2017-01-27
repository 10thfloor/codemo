const extMap = {
  '.json': 'json',
  '.html': 'html',
  '.js': 'javascript',
  '.css': 'css',
};

export function fileExtensionMap(ext) {
  return extMap[ext] ? extMap[ext] : 'javascript';
}
