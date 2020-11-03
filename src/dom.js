import {settings} from "./settings";
import {shuffle,sleep} from './functions'
const $ = require('jquery');

window.addEventListener('DOMContentLoaded', ()=>{
  for(let i=0;i<(settings.row)+1;i++){
    let tr = document.createElement('tr');
    for(let j=0;j<settings.col;j++){
      let td = document.createElement('td');
      if(i===0 && j===0){
        td.innerText = "教卓";
        td.colSpan = settings.col;
        tr.appendChild(td);
      }
      else if(i!==0){
        let num = (i-1)*settings.col + j + 1;
        num = (num <= settings.people) ? num : null;
        td.innerText = num;
        if(num){ $('select').append(`<option value="${num}">${num}</option>`); }
        tr.appendChild(td);
      }
    }
    document.querySelector('table').appendChild(tr);
  }

  $('button#shuffleCounterConfirm').on('click',async ()=>{
    const count = Number($('input').val());
    for(let i=0;i<count;i++){
      await shuffle();
      await sleep(200);
    }
  });

  $('button#frontPpl').on('click',()=>{
    let frontNum = $('select#frontPpl').val();
    if(frontNum){
    $('i#frontPpl').text($('i#frontPpl').text()+','+frontNum);
    $('select#frontPpl').html($('select#frontPpl').html().replace('<option value="'+frontNum+'">'+frontNum+'</option>',''));
    }
    else{
        $('select#frontPpl').css('display','none');
        $('button#frontPpl').css('display','none');
    }
  });

  $('button#code').on('click',()=>{
    prompt('以下のHTMLコードをコピーしてください。', document.querySelector('html').outerHTML);
  });
});