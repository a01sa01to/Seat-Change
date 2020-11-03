/**
 * @returns {Object} settings - Object
 * @returns {Number} settings.col - 横の席数
 * @returns {Number} settings.row - 縦の席数
 * @returns {Number} settings.people - 生徒数
 */
const settings = {
  col: 7,
  row: 6,
  people: 42
};

if(settings.col * settings.row > settings.people){
  console.error("People exceeded!!!")
}

export {settings};