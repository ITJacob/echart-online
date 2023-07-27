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

export function dataProcess(data: string[][]) {
  const sort = (index, isDec = false) =>
    data
      .sort(
        (a, b) =>
          (Number(a[index].replaceAll(',', '')) -
            Number(b[index].replaceAll(',', ''))) *
          (isDec ? 1 : -1) // 正序是从大到小
      )
      .slice(0, 20)
      .map((d) => [d[1], Number(d[index].replaceAll(',', ''))]);
  const result = [
    { name: '总营业额', data: sort(4) },
    { name: '订单件数', data: sort(5) },
    { name: '销售个数', data: sort(3) },
    { name: '倒：总营业额', data: sort(4, true) },
    { name: '倒：订单件数', data: sort(5, true) },
    { name: '倒：销售个数', data: sort(3, true) },
  ];

  return result;
}

export function draw(
  this: echarts.ECharts,
  name: string,
  data: string[][],
  keyMap
) {
  // const d = data.slice(1);
  // 绘制图表
  const _data = data.reverse();
  this.setOption({
    title: {
      text: name,
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
      data: _data.map((d) =>
        keyMap[d[0].toUpperCase()]
          ? keyMap[d[0].toUpperCase()][0]
          : d[0].toUpperCase()
      ),
    },
    series: [
      {
        type: 'bar',
        data: _data.map((d) => d[1]),
      },
    ],
  });
}
