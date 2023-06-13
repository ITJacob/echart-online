// Import stylesheets
import './style.css';
import { getData } from './data';
import { getAda } from './ada';
import { getKeyMap } from './keyMap';
import { init, draw } from './charts';

async function main() {
  const mainChart = init('main');
  const [data, ada, keyMap] = await Promise.all([
    getData(),
    getAda(),
    getKeyMap(),
  ]);
  console.log(data);
  console.log(ada);
  console.log(keyMap);

  draw.call(mainChart, 'ceshi', [['hh'], ['dd']]);
}

function dataProcess() {
  [
    ['time', '个数', '件数', '销售总数', '广告'],
    ['2015', 43.3, 85.8, 93.7],
    ['2016', 83.1, 73.4, 55.1],
    ['2017', 86.4, 65.2, 82.5],
    ['2018', 72.4, 53.9, 39.1]
  ]
}

main();
