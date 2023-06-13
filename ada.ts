import { getFiles } from './tools';

export async function getAda() {
  const files = await getFiles('ada');
  const result = {};
  for (let key in files) {
    // 文件分行
    // 除去首6尾1行无用数据，
    // 除去首尾双引号，以逗号隔开
    result[key.slice(0, -4)] = files[key]
      .split('\n')
      .slice(6, -1)
      .map((l) => {
        const arr = l.slice(1, -1).split('","');
        return [arr[3], arr[8], arr[16]];
      });
  }
  return result;
}
