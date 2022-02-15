const {addProperty, addFunction, requireJson} = require('../../library');
const { project, name:addon } = requireJson('./src/data/addon');
/**
 * @returns {()=>String}
 */
function Speak({ message, name, type }) {
  if (!!type) type = `(${type}) `;
  else type = ''
  return () => `[${name|| 'file'}] - ${type}${message|| 'content'}`.log;
}
addProperty.string('noIdSync', function () {
  let text = this.split(':');
  return text[text.length - 1];
});
addFunction.string('noId', function (callback) {
  let text = this.split(':');
  return callback(text[text.length - 1], text[0], text);
});
addProperty.string('noIdDataSync', function () {
  let text = this.split(':');
  return text[text.length - 2];
});
addFunction.string('noIdData', function (callback) {
  let text = this.split(':');
  return callback(text[1], { id: text[0], data: text[2] }, text);
});
addFunction.string('tools', function (tool) {
  return this.replace(/({tool})/g, tool);
});

addFunction.object('createJson', function (name) {
  return (folder)=> this.toJson().createFile(`./${project}/${addon}_BP/${folder}/${name}`);
});
module['exports'] = {
  Speak,
};
