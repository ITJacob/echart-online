import { getFiles } from './tools';

export async function getData() {
  const files = await getFiles('data');
  return files.map((f) =>
    // 文件分行
    // 除去首尾4行无用数据，
    // 除去首尾双引号，以逗号隔开
    f
      .split('\n')
      .slice(4, -4)
      .map((l) => l.slice(1, -1).split('","'))
  );
}
