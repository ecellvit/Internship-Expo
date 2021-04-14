import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader() {
  return (
    <div className="below-nav">
      <CircularProgress color="white" />
    </div>
  );
}
