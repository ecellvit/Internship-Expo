import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        height: "calc(100vh - 6rem)",
        width: "100vw",
      }}
    >
      <CircularProgress color="white" />
    </div>
  );
}
