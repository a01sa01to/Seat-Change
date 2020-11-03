import {settings} from "./settings"
const $ = require('jquery')

/**
 * @summary 待機します
 * @param {Number} ms - Sleepするミリ秒
 * @async
 * @returns {Promise}
 */
async function sleep(ms){
  return new Promise(r=>{setTimeout(r,ms)});
}

const num = [];
for(let i=0;i<settings.people;i++){
  num.push(i+1);
}

/**
 * @summary シャッフルして表示します
 * @async
 * @returns {void}
 */
async function shuffle(){
  let num1 = num.concat();
  let rand = [];
  for(let i=0;i<num.length;i++){
    const r = await random(num1)
    rand.push(r);
    num1 = num1.filter(_=>_!==r);
  }
  let front = $('i#frontPpl').text().replace('FRONT:','').split(',').filter(_=>_).map(_=>Number(_));
  const f = Math.ceil(front.length/settings.col) * settings.col;
  let frontRand = [];
  let frontRand1 = [];
  for(let i=0;i<f;i++){
    if(front[i]){
      frontRand.push(front[i]);
      rand = rand.filter(_=>_!==front[i])
    }
    else{
      frontRand.push(rand[0])
      rand.splice(0,1)
    }
  }
  for(let i=0;i<f;i++){
    const r = await random(frontRand)
    frontRand1.push(r);
    frontRand = frontRand.filter(_=>_!==r);
  }
  const all = frontRand1.concat(...rand);
  for(let i=0;i<all.length;i++){
    $('table td')[i+1].innerText = all[i];
  }
}

/**
 * @summary 配列の中からランダムに取り出す
 * @async
 * @param {Number[]} arr - 配列
 * @returns {Number}
 */
async function random(arr){
  // const max = Math.max(...arr);
  // const min = Math.min(...arr);
  // const rand = Math.round(Math.random() * (max-min)) + min
  // return arr.includes(rand) ? rand : await random(arr);
  const rand = Math.floor(Math.random() * arr.length)
  return arr[rand];
}

export {sleep, shuffle, random}