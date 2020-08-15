const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

function readableFileSize(size: number) {
  let newSize = size;

  let i = 0;

  while (newSize >= 1024) {
    newSize /= 1024;

    i += 1;
  }

  return `${newSize.toFixed(1)} ${units[i]}`;
}

export default readableFileSize;
