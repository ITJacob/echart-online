import { getFiles } from './tools';

// 长短号 对照表
export async function getKeyMap() {
  const files = await getFiles('keyMap');
  const file = files[Object.keys(files)[0]];
  // 文件分行
  // 以逗号隔开，取前两项
  return file
    .split('\r\n')
    .reduce(
      (pre, cur, i) => {
        const [l, s] = cur
          .split(',')
          .slice(0, 2)
          .map((k) => k.replaceAll('"', '').trim().toUpperCase());

        // 长编号是库存号，
        // 短编号是商品号是唯一的
        const [lMap, sMap] = pre;
        if (!l) return pre;
        lMap[l] = (lMap[l] || new Set()).add(s);
        sMap[s] = (sMap[s] || new Set()).add(l);
        return pre;
      },
      [{}, {}]
    )
    .map((codeMap) => {
      const result = {};
      for (let c in codeMap) {
        result[c] = [...codeMap[c]];
      }
      return result;
    });
}
