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

main();
