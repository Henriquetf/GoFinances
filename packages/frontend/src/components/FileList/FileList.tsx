import React from 'react';

import styles from './FileList.module.scss';

interface FileProps {
  name: string;
  readableSize: string;
}

interface FileListProps {
  files: FileProps[];
}

const FileList: React.FC<FileListProps> = ({ files }: FileListProps) => {
  return (
    <ul className={styles.container}>
      {files.map((uploadedFile) => (
        <li key={uploadedFile.name}>
          <div className={styles.fileInfo}>
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>{uploadedFile.readableSize}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
