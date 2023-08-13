// Import stylesheets
import './style.css';
import * as XLSX from 'xlsx';
import { getFiles } from '../tools';
import { draw, init } from './chart';


export type IFiles = { [time: string]: string[][] };

async function main() {
  const files = await getFiles('data', 'rAAB');
  
  const result = {};
  for (let key in files) {
    const wb = XLSX.read(files[key])
    sheetProcess(wb.Sheets['Sheet1'], result)
  }

  const mainChart = init('main');
  draw.call(mainChart, result);
}

function sheetProcess(sheet, result) {
  // 行数
  const rN = Number(sheet['!ref'].split(':')[1].slice(1));
  for (let i = 1; i <=rN; i++) {
    if (!sheet[`H${i}`] || !sheet[`I${i}`]) {
      continue
    }
    const productName = sheet[`H${i}`].v;
    const productNumber = Number(sheet[`I${i}`].v);
    if (isNaN(productNumber)) {
      continue
    }
    if (result[productName] === undefined) {
      result[productName] = 0;
    }
    result[productName] += productNumber; 
  }

}

main();
