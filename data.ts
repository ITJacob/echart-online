import { getFiles } from './tools';

// 销售数据
export async function getData() {
  const files = await getFiles('data');
  const result = {};
  for (let key in files) {
    // 文件分行
    // 除去首尾4行无用数据，
    // 除去首尾双引号，以逗号隔开
    result[key.slice(2, -4)] = files[key]
      .split('\n')
      .slice(4, -4)
      .map((l) => l.slice(1, -1).split('","'));
  }
  return result;
}
