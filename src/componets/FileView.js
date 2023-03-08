import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function FileView() {
  console.log(fileUrl);
  const docs = [{ uri: fileUrl }];
  // { uri: require("../pdf/cade803eb083c635a453ec291daa2df0.pdf") },

  return (
    <div className="mx-20">
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
    </div>
  );
}

export default FileView;
