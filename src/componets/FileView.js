import React from "react";
import { Document, Page } from "react-pdf";


function FileView({ fileUrl }) {
  return (
    <Document file={fileUrl}>
      <Page pageNumber={1} />
    </Document>
  );
}

export default FileView;
