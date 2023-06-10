import { getFiles } from './tools';

export async function getAda() {
  const files = await getFiles('ada');
  return files.map((f) =>
    // 除去首6尾1行无用数据，
    // 除去首尾双引号，以逗号隔开
    f.slice(6, -1).map((l) => l.slice(1, -1).split('","'))
  );
}
