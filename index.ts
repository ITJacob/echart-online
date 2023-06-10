// Import stylesheets
import './style.css';
import { getData } from './data';
import { getAda } from './ada';

async function main() {
  const [data, ada] = await Promise.all([getData(), getAda()]);
  console.log(data);
  console.log(ada);
}

main();
