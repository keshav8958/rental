import React from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

const ImageInput = ({ setImages }) => {
  const getUploadParams = ({ meta }) => {
    return { url: "http://localhost:8000/api/image/" };
  };

  const handleChangeStatus = ({ meta }, status, files) => {
    if (status === "done") {
      let images = files.map((f) => f.xhr.response);

      setImages(images);
    }
  };

  return (
    <div className="mb-3">
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        accept="image/*"
        submitButtonDisabled={true}
        maxSizeBytes={1024 * 1024}
      />
    </div>
  );
};

export default ImageInput;
