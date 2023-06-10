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
  const file: File = e.target.files[0];
  if (!file) return;
  const result = await readFile(file);
  draw(file, result);
}

function readFile(file: Blob) {
  return new Promise<string[][]>((res) => {
    const reader = new FileReader();
    reader.readAsText(file, 'shift_jis');
    reader.onloadend = () => {
      // 除去首尾4行无用数据
      const lines = (reader.result as string).split('\n').slice(4, -4);
      const content = lines
        // 除去每行首尾的双引号，以逗号分割
        .map((l) => l.slice(1, -1).split('","'));
      res(content);
    };
  });
}

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
