import React, { ReactNode } from 'react';

import Dropzone from 'react-dropzone';

import styles from './Upload.module.scss';

interface UploadProps {
  onUpload: (files: File[]) => void;
}

const Upload: React.FC<UploadProps> = ({ onUpload }: UploadProps) => {
  function renderDragMessage(
    isDragActive: boolean,
    isDragReject: boolean,
  ): ReactNode {
    if (!isDragActive) {
      return (
        <p className={styles.uploadMessage}>
          Selecione ou arraste o arquivo aqui.
        </p>
      );
    }

    if (isDragReject) {
      return (
        <p
          className={`${styles.uploadMessage} ${styles['uploadMessage--error']}`}
        >
          Arquivo não suportado
        </p>
      );
    }

    return (
      <p
        className={`${styles.uploadMessage} ${styles['uploadMessage--success']}`}
      >
        Solte o arquivo aqui
      </p>
    );
  }

  return (
    <Dropzone
      accept=".csv, application/vnd.ms-excel, text/csv"
      onDropAccepted={(files) => onUpload(files)}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <div
          className={`
            ${styles.dropContainer}
            ${isDragActive ? styles['dropContainer--dragActive'] : ''}
            ${isDragReject ? styles['dropContainer--dragReject'] : ''}
          `}
          {...getRootProps()}
        >
          <input {...getInputProps()} data-testid="upload" />
          {renderDragMessage(isDragActive, isDragReject)}
        </div>
      )}
    </Dropzone>
  );
};

export default Upload;
