import * as echarts from 'echarts';

export function init(id: string) {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById(id));
  window.addEventListener('resize', function () {
    myChart.resize();
  });
  return myChart;
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
      { type: 'bar', label: { show: true } },
      { type: 'bar', label: { show: true } },
      { type: 'line', label: { show: true } },
      { type: 'bar', label: { show: true } },
      { type: 'bar', label: { show: true } },
    ],
  });
}
