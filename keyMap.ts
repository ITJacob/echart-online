import { getFiles } from './tools';

export async function getKeyMap() {
  const files = await getFiles('keyMap');
  // 文件分行
  // 以逗号隔开，取前两项
  return files[0].split('\r\n').reduce((pre, cur, i) => {
    const [l, s] = cur
      .split(',')
      .slice(0, 2)
      .map((k) => k.replaceAll('"', '').trim().toUpperCase());
    if (pre[l]) throw new Error(`第${i + 1}行，存在重复的长编号：${l}`);
    if (l) pre[l] = s;
    return pre;
  }, {});
}
