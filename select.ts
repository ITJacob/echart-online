export function getSelectValue(values: { [s: string]: string[] }) {
  return new Promise<string>((res) => {
    const select = document.getElementById('item-select');
    select.addEventListener('change', (e) => {
      res((e.target as HTMLSelectElement).value);
    });

    for (let key in values) {
      let option = document.createElement('option');
      option.setAttribute('value', key);

      let optionText = document.createTextNode(key);
      option.appendChild(optionText);

      select.appendChild(option);
    }
  });
}
