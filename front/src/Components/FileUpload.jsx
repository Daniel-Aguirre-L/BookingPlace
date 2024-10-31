import React, { useState, useRef  } from 'react';

const FileUpload = ({ onChange, error, setError }) => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null); 

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    if (files.length + newFiles.length < 5) {
      setError('Debes seleccionar al menos 5 imágenes.');
    } else {
      setError('');
    }
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    onChange([...files, ...newFiles]);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange(updatedFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    if (updatedFiles.length < 5) {
      setError('Debes seleccionar al menos 5 imágenes.');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <div className="cursor-pointer p-12 flex justify-center bg-white  rounded-xl border border-[#A9AEB9]">
        <input
          type="file"
          multiple
          accept=".jpg, .jpeg, .png, .webp"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          ref={fileInputRef}
        />
        <label htmlFor="file-upload" className="text-center cursor-pointer">
          <span className="inline-flex justify-center items-center size-16 bg-gray-100 text-gray-800 rounded-full ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" x2="12" y1="3" y2="15"></line>
            </svg>
          </span>

          <div className="mt-4 flex flex-wrap justify-center text-sm leading-6 text-gray-600">
            <span className="pe-1 font-medium text-gray-800">Drop your file here or</span>
            <span className="bg-white font-semibold text-blue-600 hover:text-blue-700 rounded-lg decoration-2 hover:underline">
              browse
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-400">Pick a file up to 2MB.</p>
        </label>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4 space-y-2">
        {files.map((file, index) => (
          <div key={index} className="p-3 bg-white border border-solid border-gray-300 rounded-xl">
            <div className="mb-1 flex justify-between items-center">
              <div className="flex items-center gap-x-3">
                <span className="size-10 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg ">
                {file.type.startsWith('image/') && (
                    <img
                      className="rounded-lg"
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{ width: '50px', height: '50px' }}
                    />
                  )}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    <span className="truncate inline-block max-w-[300px] align-bottom">{file.name}</span>
                  </p>
                  <p className="text-xs text-gray-500 ">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <button type="button" onClick={() => removeFile(index)} className="text-gray-500 hover:text-gray-800 focus:outline-none">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> 
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-x-3 whitespace-nowrap">
              <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center" style={{ width: `${progress}%` }} />
              </div>
              <div className="w-10 text-end">
                <span className="text-sm text-gray-800">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;

