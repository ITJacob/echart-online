import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
window.addEventListener('resize', function () {
  myChart.resize();
});

function draw(file: File, data: string[][]) {
  // const d = data.slice(1);
  // 绘制图表
  myChart.setOption({
    title: {
      text: file.name,
    },
    tooltip: {},
    dataset: {
      source: data.map((d) => [d[0], d[5]]),
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    series: [{ type: 'bar' }],
  });
}
