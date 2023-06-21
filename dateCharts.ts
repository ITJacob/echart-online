import * as echarts from 'echarts';
import { IFiles } from '.';

export function init(id: string) {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById(id));
  window.addEventListener('resize', function () {
    myChart.resize();
  });
  return myChart;
}

export function getItemData(data: IFiles, index: number, code: string) {
  const result = {};
  for (let time in data) {
    result[time] = data[time].filter((line) => line[index] === code);
  }
  return result;
}

export function dataProcess(data: IFiles, ada: IFiles) {
  const result: (string | number)[][] = [
    [
      '时间',
      '销售个数',
      '总营业额(千)',
      '订单件数',
      '广告费用(千)',
      '广告产生营业额(千)',
    ],
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

export function draw(this: echarts.ECharts, name: string, data: string[][]) {
  // const d = data.slice(1);
  // 绘制图表
  this.setOption({
    title: {
      text: name,
    },
    legend: {},
    tooltip: {},
    dataset: {
      source: data,
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    series: [
      { type: 'bar', label: { show: true, position: 'top' } },
      { type: 'bar', label: { show: true, position: 'top' } },
      { type: 'line', label: { show: true, position: 'top' } },
      { type: 'bar', label: { show: true, position: 'top' } },
      { type: 'bar', label: { show: true, position: 'top' } },
    ],
  });
}
