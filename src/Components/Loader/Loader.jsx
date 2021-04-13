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
        height: "100vh",
        width: "100vw",
      }}
    >
      <CircularProgress color="white" />
    </div>
  );
}
