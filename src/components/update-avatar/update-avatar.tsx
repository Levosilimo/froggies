import './update-avatar.scss';
import React, {useEffect, useRef, useState} from "react";
import {setAvatar} from "../../store/api-action";


function UpdateAvatar({username, imageRef, onClose, show}: {username: string; imageRef: HTMLImageElement | null | undefined; onClose: () => void; show:boolean;}): JSX.Element {

  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [unsupportedFile, setUnsupportedFile] = useState<File | undefined>();
  const [validFile, setValidFile] = useState<File | undefined>();

  const uploadModalRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLSpanElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if(e.keyCode === 27){
        closeUploadModal();
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  })

  const closeUploadModal = () => onClose();

  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }

  const dragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.target instanceof HTMLElement) e.target.classList.add('dragover');
  }

  const dragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.target instanceof HTMLElement) e.target.classList.remove('dragover');
  }

  const fileType = (fileName: string) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
  }

  const fileSize = (size: number) => {
    if (size === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return parseFloat((size / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  }

  const validateFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
    return validTypes.includes(file.type);
  }

  const handleFile = (file: File) => {
    setSelectedFile(file);
    if (validateFile(file)) setValidFile(file)
    else setUnsupportedFile(file);
  }

  const fileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragLeave(e);
    if(e.dataTransfer && !validFile){
      const file: File | null = e.dataTransfer.files.item(0);
      if (file) {
        handleFile(file);
      }
    }
  }

  const fileInputClicked = () => {
    fileInputRef.current?.click();
  }

  const filesSelected = () => {
    if (fileInputRef.current) {
      const file = fileInputRef.current.files?.item(0);
      if(file) handleFile(file);
    }
  }

  const removeFile = () => {
    setValidFile(undefined);
    setSelectedFile(undefined);
    setUnsupportedFile(undefined);
    if(fileInputRef.current) fileInputRef.current.value = '';
  }

  const uploadFiles = () => {
    if(uploadModalRef.current && uploadRef.current){
      uploadRef.current.innerHTML = 'File(s) Uploading...';
      if (validFile) {
        setAvatar({file: validFile, username})
          .then(() => {
            if(uploadRef.current) uploadRef.current.innerHTML = 'Drag & Drop file here or click to select file';
            if (imageRef){
              const index = imageRef.src.lastIndexOf('?')
              let src = imageRef.src;
              if (index>0) src = src.substring(0, index);
              imageRef.src = src+`?t=${Date.now()}`;
            }
            setValidFile(undefined);
            setSelectedFile(undefined);
            setUnsupportedFile(undefined);
            closeUploadModal();
          })
          .catch(() => {
            if(uploadRef.current){
              uploadRef.current.innerHTML = `<span class="error">Error Uploading File</span>`;
            }
          });
      }
    }
  }
  return (
      <div className={`upload-modal ${show?'active':''}`} ref={uploadModalRef}>
        <div className="overlay" onClick={(() => closeUploadModal())}></div>
        <div className="close" onClick={(() => closeUploadModal())}>X</div>
        <div className='upload-modal-main'>
          { !unsupportedFile && validFile ? <button className="file-upload-btn" onClick={() => uploadFiles()}>Upload File</button> : '' }
          { unsupportedFile ? <p>Please remove the unsupported file.</p> : '' }
          <div className="drop-container"
               onDragOver={dragOver}
               onDragEnter={dragEnter}
               onDragLeave={dragLeave}
               onDragEnd={dragLeave}
               onDrop={fileDrop}
          >
            <span onClick={() => fileInputClicked()} ref={uploadRef}>Drag & Drop file here or click to select file</span>
            <input
              ref={fileInputRef}
              className="file-input"
              type="file"
              onChange={filesSelected}
            />
          </div>
          <div className="file-display-container">
            {
              (selectedFile?(<div className="file-status-bar">
                <div>
                  <div className="file-type-logo"></div>
                  <div className="file-type">{fileType(selectedFile.name)}</div>
                  <span className="file-name">{selectedFile.name}</span>
                  <span className="file-size">({fileSize(selectedFile.size)})</span>
                </div>
                <div className="file-remove" onClick={() => removeFile()}>X</div>
              </div>):'')
            }
          </div>
        </div>
      </div>
  )

}

export default UpdateAvatar;
