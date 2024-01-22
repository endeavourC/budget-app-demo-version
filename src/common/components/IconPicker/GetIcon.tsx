import React from "react";
import * as mdIcons from "react-icons/md";

interface Props {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export const GetIcon = ({ name, className, style }: Props) => {
  const TheIcon = mdIcons[name as keyof typeof mdIcons];

  if (!TheIcon) return null;

  return <TheIcon style={style} className={className} />;
};
