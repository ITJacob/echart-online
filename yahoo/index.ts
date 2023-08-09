// Import stylesheets
import './style.css';
import * as XLSX from 'xlsx';
import { getFiles } from '../tools';


export type IFiles = { [time: string]: string[][] };

async function main() {
  const files = await getFiles('data', 'rAAB');
  
  const result = {};
  for (let key in files) {
    const wb = XLSX.read(files[key])
    console.log(wb); 
    // result[key] = files[key];
  }
}

main();
