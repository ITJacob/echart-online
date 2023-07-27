// 商品短号选择框
export function initDateSelectValue(values: { [s: string]: any[] }, cb) {
  const list = document.getElementById('date-select-list');
  let selected;

  const keys = Object.keys(values).sort();
  const years = keys.reduce((pre, cur) => {
    if (!pre.includes(cur.slice(0, 4))) {
      pre.push(cur.slice(0, 4));
    }
    return pre;
  }, []);

  years.concat(keys).forEach((key) => {
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
