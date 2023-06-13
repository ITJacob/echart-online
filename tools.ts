function convertFile(res, input) {
  return async function (e) {
    const files: File[] = e.target.files;
    if (!files[0]) return;
    const filePromises: Promise<string>[] = [];
    for (let i = 0; i < files.length; i++) {
      filePromises.push(readFile(files[i]));
    }
    const result = await Promise.all(filePromises);
    const fileResult: { [key: string]: string } = {};
    for (let i = 0; i < files.length; i++) {
      fileResult[files[i].name] = result[i];
    }
    res(fileResult);
    input.disabled = true;
  };
}

function readFile(file: Blob) {
  return new Promise<string>((res) => {
    const reader = new FileReader();
    reader.readAsText(file, 'shift_jis');
    reader.onloadend = () => {
      res(reader.result as string);
    };
  });
}

export function getFiles(id: string) {
  return new Promise<{ [file: string]: string }>((res) => {
    const input = document.getElementById(id);
    input.addEventListener('change', convertFile(res, input));
  });
}
