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

export function draw(
  this: echarts.ECharts,
  data: {[key: string]: number},
) {
  // 从小到大排序，取后100个单位。
  const _data = Object.keys(data).sort((a, b) => data[a] - data[b]).slice(-100); 
  this.setOption({
    title: {
      text: '销售排行',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {},
    grid: {
      left: '25%',
    },
    xAxis: {
      position: 'top',
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: _data,
    },
    series: [
      {
        type: 'bar',
        data: _data.map((d) => data[d]),
      },
    ],
  });
}
