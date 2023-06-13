// const countriesDropDown = document.getElementById("countriesDropDown");
const countriesData = {
  Australia: '',
  Canada: '',
  UK: '',
  USA: '',
};

function onSelect(res) {
  return;
}

export function getValue(values: { [s: string]: string[] }) {
  return new Promise<string>((res) => {
    const select: HTMLSelectElement = document.getElementById(
      'item-select'
    ) as HTMLSelectElement;
    select.addEventListener('change', (e) => {
      res(e.target.value);
    });

    for (let key in values) {
      let option = document.createElement('option');
      option.setAttribute('value', values[key][0]);

      let optionText = document.createTextNode(key);
      option.appendChild(optionText);

      select.appendChild(option);
    }
  });
}
