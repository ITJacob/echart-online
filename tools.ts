function convertFile(res, input, type?: string) {
  return async function (e) {
    const files: File[] = e.target.files;
    if (!files[0]) return;
    const filePromises: Promise<string>[] = [];
    for (let i = 0; i < files.length; i++) {
      filePromises.push(readFile(files[i], type));
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

function readFile(file: Blob, type?: string) {
  return new Promise<string>((res) => {
    const reader = new FileReader();
    if (type === "rAAB") {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file, "shift_jis");
    }
    reader.onloadend = () => {
      res(reader.result as string);
    };
  });
}

// 文件读取器
export function getFiles(id: string, type?: string) {
  return new Promise<{ [file: string]: string }>((res) => {
    const input = document.getElementById(id);
    input.addEventListener("change", convertFile(res, input, type));
  });
}
