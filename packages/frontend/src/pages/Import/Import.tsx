import React, { useState } from 'react';

import FileList from '../../components/FileList';
import AlertIcon from '../../components/Icons/AlertIcon';
import Upload from '../../components/Upload';

import { importTransactionSpreadsheet } from '../../services/api/transaction';

import readableFileSize from '../../utils/readableFileSize';
import styles from './Import.module.scss';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<FileProps[]>([]);

  async function handleUpload() {
    if (isUploading) {
      return;
    }

    try {
      await importTransactionSpreadsheet(filesToUpload[0].file);

      setFilesToUpload([]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  }

  function submitFile(files: File[]): void {
    setFilesToUpload(
      files.map((file) => ({
        file,
        name: file.name,
        readableSize: readableFileSize(file.size),
      })),
    );
  }

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.title}>Importar uma transação</h2>

        <div className={styles.content}>
          <Upload onUpload={submitFile} />
          {Boolean(filesToUpload.length) && (
            <FileList
              files={filesToUpload.map(({ name, readableSize }) => ({
                name,
                readableSize,
              }))}
            />
          )}

          <div className={styles.controls}>
            <AlertIcon />
            <span className={styles.info}>Permitido apenas arquivos CSV</span>

            <button
              onClick={handleUpload}
              type="button"
              className={styles.sendButton}
            >
              Enviar
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Import;
