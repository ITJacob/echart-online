// 商品短号选择框
export function initDateSelectValue(values: { [s: string]: any[] }, cb) {
  const list = document.getElementById('date-select-list');
  let selected;

  Object.keys(values)
    .sort()
    .forEach((key) => {
      let li = document.createElement('li');
      // li.setAttribute('value', key);

      let optionText = document.createTextNode(key);
      li.appendChild(optionText);

      list.appendChild(li);
    });

  list.addEventListener('click', (e) => {
    cb((e.target as HTMLElement).textContent);
    (e.target as HTMLElement).style.backgroundColor = 'burlywood';
    if (selected) {
      selected.style.backgroundColor = 'white';
    }
    selected = e.target;
  });
}
