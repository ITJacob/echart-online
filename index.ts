// Import stylesheets
import './style.css';
import { getData } from './data';
import { getAda } from './ada';
import { getKeyMap } from './keyMap';
import {
  init as mainInit,
  draw as mainDraw,
  getItemData,
  dataProcess,
} from './charts';
import {
  init as dateInit,
  draw as dateDraw,
  dataProcess as dateDataProcess,
} from './dateCharts';
import { initSelectValue } from './select';
import { initDateSelectValue } from './dateSelect';

export type IFiles = { [time: string]: string[][] };

async function main() {
  const mainChart = mainInit('main');
  const dateChart = dateInit('date-chart');

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
    mainDraw.call(mainChart, '产品销量', d);
  });

  initDateSelectValue(data, (key) => {
    const selectData = data[key];
    const d = dateDataProcess(selectData);
    console.log(d);
    dateDraw.call(dateChart, '月销量排行', d);
  });
}

main();
