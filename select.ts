// 商品短号选择框
export function initSelectValue(values: { [s: string]: string[] }, cb) {
  const select = document.getElementById('item-select');
  Object.keys(values).sort().forEach(key => {
    let option = document.createElement('option');
    option.setAttribute('value', key);

    let optionText = document.createTextNode(key);
    option.appendChild(optionText);

    select.appendChild(option);
  });

  select.addEventListener('change', (e) => {
    cb((e.target as HTMLSelectElement).value);
  });

}