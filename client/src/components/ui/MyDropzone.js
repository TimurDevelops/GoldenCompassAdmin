import React, {useCallback, useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone'
import PropTypes from "prop-types";
import api from "../../utils/api";
import {serverUrl} from '../../config.json';


const container = {
  width: '100%'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  paddingTop: 10
};
const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};
const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


const MyDropzone = ({filePicked, showPreview = true}) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(async acceptedFiles => {
    let urls = [];
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('file', file);

      const res = await api.post('/files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      urls.push(`${serverUrl}/${res.data}`);
    }
    setFiles(urls);
    filePicked(urls)
  }, [filePicked])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'image/*', onDrop, maxFiles: 1});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const thumbs = files.map(file => (
    <div style={thumb} key={file}>
      <div style={thumbInner}>
        <img
          src={file}
          style={img}
          alt={'Загружаемое изображение'}
        />
      </div>
    </div>
  ));

  return (
    <div className="container" style={container}>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Перетащите файл сюда, или нажмите чтобы выбрать файл...</p>
      </div>
      {files.length > 0 && showPreview && <aside style={thumbsContainer}>
        <h3>Загружаемые файлы...</h3>
        {thumbs}
      </aside>}
    </div>
  );
}

MyDropzone.props = {
  filePicked: PropTypes.func.isRequired,
  showPreview: PropTypes.bool,
}

export default MyDropzone;