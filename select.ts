// 商品短号选择框
export function initSelectValue(values: { [s: string]: string[] }, cb) {
  const select = document.getElementById('item-select');
  const list = document.getElementById('item-select-list');

  Object.keys(values)
    .sort()
    .forEach((key) => {
      let option = document.createElement('option');
      option.setAttribute('value', key);
      list.appendChild(option);
    });

  select.addEventListener('change', (e) => {
    cb((e.target as HTMLSelectElement).value);
  });
}
