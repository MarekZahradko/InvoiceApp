import React from "react";

// component for displaying messages
export function FlashMessage({ theme, text }) {
  // render alert with chosen theme and text
  return <div className={"alert alert-" + theme}>{text}</div>;
}

// export FlashMessage component
export default FlashMessage;
