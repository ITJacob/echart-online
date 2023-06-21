// Import stylesheets
import './style.css';
import { getData } from './data';
import { getAda } from './ada';
import { getKeyMap } from './keyMap';
import { init, draw, getItemData, dataProcess } from './charts';
import { initSelectValue } from './select';
import { initDateSelectValue } from './dateSelect';

export type IFiles = { [time: string]: string[][] };

async function main() {
  const mainChart = init('main');
  const dateChart = init('date-chart');

  const [data, ada, keyMap] = await Promise.all([
    getData(),
    getAda(),
    getKeyMap(),
  ]);
  console.log(data);
  console.log(ada);
  console.log(keyMap);
  const [lMap, sMap] = keyMap;

  initSelectValue(sMap, (key) => {
    const selectData = getItemData(data, 1, sMap[key][0]);
    const selectAda = getItemData(ada, 0, key);
    const d = dataProcess(selectData, selectAda);
    console.log(d);
    draw.call(mainChart, '产品销量', d);
  });

  initDateSelectValue(data, (key) => {
    const selectData = getItemData(data, 1, sMap[key][0]);
    const selectAda = getItemData(ada, 0, key);
    const d = dataProcess(selectData, selectAda);
    console.log(d);
    draw.call(dateChart, '月销量排行', d);
  });
}

main();
