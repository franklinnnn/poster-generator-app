import React from "react";
import EditProvider from "./posters/albums/edit-context";

export const ClientWrapper = ({ children }) => {
  return <EditProvider>{children}</EditProvider>;
};
