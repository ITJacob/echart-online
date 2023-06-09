// Import stylesheets
import './style.css';
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
window.addEventListener('resize', function () {
  myChart.resize();
});

const input = document.querySelector('input');
input.addEventListener('change', convertFile);

async function convertFile(e) {
  const file: Blob = e.target.files[0];
  if (!file) return;
  const result = await readFile(file);
  alert(result[0][0]);
}

function readFile(file: Blob) {
  return new Promise<string[][]>((res) => {
    const reader = new FileReader();
    reader.readAsText(file, 'shift_jis');
    reader.onloadend = () => {
      const lines = (reader.result as string).split('\n').slice(4);
      const header = lines[0].split(',').filter((l) => l); // 除去空列
      const content = lines
        // 除去没有表头的空列
        .map((l) => l.split(','));
      // 除去没有内容的空行
      // // 表头和内容拼接，二维数组
      // const result = [header].concat(content);
      res(content);
    };
  });
}

// 绘制图表
myChart.setOption({
  title: {
    text: '李祥的数据',
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
});
