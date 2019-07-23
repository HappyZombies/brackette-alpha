import React from "react";
import { Icon } from "@mdi/react";
import { mdiLoading } from "@mdi/js";

const Loading = () => (
  <Icon path={mdiLoading} size={4.5} spin={1} className="auth-loader" />
);

export default Loading;
