import { Box, CircularProgress } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";

const FileViewer = ({ fileUrl, fileType, style, className, fallbackText }) => {
    const [isLoading, setIsLoading] = useState(true)
    const iframeRef = useRef(null);
  /**
   * Utility function to determine the MIME type of the file
   * if not explicitly passed.
   */
  const getMimeType = (fileType) => {
    const mimeMap = {
      pdf: "application/pdf",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      txt: "text/plain",
      mp4: "video/mp4",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      csv: "text/csv",
    };
    return mimeMap[fileType] || "application/octet-stream";
  };

  const mimeType = getMimeType(fileType);

  console.log(mimeType);

  const getIframeLink  = useCallback(() => {
    return `https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(fileUrl)}`;
  },[fileUrl])




  function iframeLoaded() {
    // clearInterval(iframeTimeoutId);
    setIsLoading(false)
  }

  /**
   * Render appropriate file viewer based on MIME type
   */
  const renderFileViewer = () => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const youtubeMatch = fileUrl.match(youtubeRegex);
  
    if (youtubeMatch) {
      const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      return (
        <iframe
          width="100%"
          height="100%"
          src={youtubeEmbedUrl}
          title="YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => iframeLoaded()}
        />
      );
    }

    if (mimeType.startsWith("image/")) {
      // Render images
      return (
        <img
          src={fileUrl}
          alt="File Preview"
          style={{ maxWidth: "100%", height: "auto", overflow:"auto" }}
          onLoad={() => setIsLoading(false)}
        />
      );
    } else if (mimeType.startsWith("video/")) {
      // Render videos
      return (
        <video controls style={{ width: "100%", height:"100%" }} onCanPlay={() => setIsLoading(false)} autoPlay>
          <source src={fileUrl} type={mimeType} />
          {fallbackText || "Your browser does not support video playback."}
        </video>
      );
    } else if (mimeType === "application/pdf") {
      // Render PDFs
      return (
        <iframe
          src={getIframeLink()}
          style={{ width: "100%", height: "100%", border: "none" }}
          title="PDF Viewer"
          onLoad={() => setIsLoading(false)}
        />
      );
    } else if (mimeType === "text/plain" || mimeType.startsWith("text/")) {
      // Render text files
      return (
        <iframe
          src={fileUrl}
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Text Viewer"
          onLoad={() => setIsLoading(false)}
        />
      );
    } else if (
      mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      mimeType === "application/msword"
    ) {
      console.log("inside dox");

      // const officeUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
      //     fileUrl
      //   )}&wdHideToolbar=true&wdHideFooter=true&wdHideComments=true&wdHideMenu=true`;
    //   const officeUrl = `https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(
    //     fileUrl
    //   )}`;
      return (
        <iframe
          src={getIframeLink()}
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Document Viewer"
          onLoad={() => iframeLoaded()}
          onError={() => updateIframeSrc()}
          ref={iframeRef}
        />
      );
    } else {
      // Fallback for unsupported formats (e.g., docx, xlsx)
      return (
        <div style={{ textAlign: "center", padding: "10px" }}>
          <p>
            {fallbackText ||
              "File preview not available. Download the file instead."}
          </p>
          <a
            href={fileUrl}
            download
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Download File
          </a>
        </div>
      );
    }
  };

  return (
    <Box
      className={className}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position:"relative",
        height: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex:1,
            position:"absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {renderFileViewer()}
    </Box>
  );
};

export default FileViewer;
