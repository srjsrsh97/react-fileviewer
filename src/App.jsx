import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FileViewer from "./FileViewer";
import { Box, Typography } from "@mui/material";

function App() {

  return (
    <>
      <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
        <Box sx={{ flex: 1, display:"flex", flexDirection:"column", gap:2 }}>
        <Typography variant="h4" sx={{ margin: "auto" }}>PDF</Typography>
        <FileViewer
          fileUrl="https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf"
          fileType="pdf"
        />
        </Box>
        <Box sx={{ flex: 1, display:"flex", flexDirection:"column", gap:2 }}>
        <Typography variant="h4" sx={{ margin: "auto" }}>Image</Typography>
        <FileViewer
          fileUrl="https://picsum.photos/200/300"
          fileType="jpeg"
        />
        </Box>
        <Box sx={{ flex: 1, display:"flex", flexDirection:"column", gap:2 }}>
        <Typography variant="h4" sx={{ margin: "auto" }}>Youtube Link</Typography>
        <FileViewer
          fileUrl="https://youtu.be/5vsOv_bcnhs?si=aFFUFoWpBxsZ5vpy"
          fileType="mp4"
        />{" "}
        </Box>
        <Box sx={{ flex: 1, display:"flex", flexDirection:"column", gap:2 }}>
        <Typography variant="h4" sx={{ margin: "auto" }}>MP4</Typography>
        <FileViewer
          fileUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          fileType="mp4"
        />{" "}
        </Box>
      </Box>
    </>
  );
}

export default App;
