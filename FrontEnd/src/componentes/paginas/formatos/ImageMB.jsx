import React, {useRef} from "react";
import ReactDOM from "react-dom";
import { withRouter } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import axios from 'axios';
import ImageUploading from "react-images-uploading";

const ImageMB = () => {

    const filterBySize = (file) => {
  //filter out images larger than 5MB
  return file.size <= 5242880;
};

    const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    submit: {
          margin: theme.spacing(3, 0, 2),
          backgroundColor: theme.palette.error.dark,
        },
  }));

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const reader1 = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;

      };
      reader.readAsDataURL(file);
      reader1.readAsBinaryString(file);
      console.log(file);
      console.log(reader1)
    }
  };

  return (
  
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
    Para cambiar la imagen del header de los PDF's haga click en el recuadro.
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none"
        }}
      />
      <div
        style={{
          height: "300px",
          width: "500px",
          border: "1px dashed black"
        }}
        onClick={() => imageUploader.current.click()}
      >
        <img
          ref={uploadedImage}
          style={{
            width: "100%",
            height: "100%",
            position: "acsolute"
          }}
        />
      </div>
    </div>
  );
}

export default withRouter(ImageMB);
