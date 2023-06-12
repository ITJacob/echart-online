// Import stylesheets
import './style.css';
import { getData } from './data';
import { getAda } from './ada';
import { getKeyMap } from './keyMap';

async function main() {
  const [data, ada, keyMap] = await Promise.all([
    // getData(),
    // getAda(),
    getKeyMap(),
  ]);
  console.log(data);
  console.log(ada);
  console.log(keyMap);
}

main();
