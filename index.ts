// Import stylesheets
import './style.css';
import { getData } from './data';
import { getAda } from './ada';
import { getKeyMap } from './keyMap';
import { init, draw } from './charts';
import { initSelectValue } from './select';

type IFiles = { [time: string]: string[][] };

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
  const [lMap, sMap] = keyMap;
  initSelectValue(sMap, (key) => {
    const selectData = getItemData(data, 1, sMap[key][0]);
    const selectAda = getItemData(ada, 0, key);
    const d = dataProcess(selectData, selectAda);
    console.log(d);
    draw.call(mainChart, '产品销量', d);
  });
}

function getItemData(data: IFiles, index: number, code: string) {
  const result = {};
  for (let time in data) {
    result[time] = data[time].filter((line) => line[index] === code);
  }
  return result;
}

function dataProcess(data: IFiles, ada: IFiles) {
  const result: (string | number)[][] = [
    ['时间', '销售个数', '总营业额', '订单件数', '广告费用', '广告产生营业额'],
  ];

  for (let time in data) {
    const _dada = data[time][0]
      ? data[time][0].map((d) => Number(d.replaceAll(',', '')))
      : [0, 0, 0];
    const _ada = ada[time][0]
      ? ada[time][0].map((d) => Number(d.replaceAll(',', '')))
      : [0, 0];
    const temp = [time, ..._dada.slice(-3), ..._ada.slice(-2)];
    temp[2] = (temp[2] as number) / 1000;
    temp[4] = (temp[4] as number) / 1000;
    temp[5] = (temp[5] as number) / 1000;
    result.push(temp);
  }
  return result;
}

main();
