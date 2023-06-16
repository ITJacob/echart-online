// 商品短号选择框
export function initSelectValue(values: { [s: string]: string[] }, cb) {
  const select = document.getElementById('item-select');
  const list = document.getElementById('item-select-list');
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

  select.addEventListener('input', (e: InputEvent) => {
    // cb((e.target as HTMLSelectElement).value);
    for (let i of list.children) {
      const res = i.textContent.includes(e.data);
      (i as HTMLElement).style.opacity = res ? '1' : '0.6';
    }
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
