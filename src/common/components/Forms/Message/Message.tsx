import classNames from "classnames";

export enum MessageType {
  Success = "success",
  Danger = "danger",
}

interface Props {
  message: string | undefined;
  type: MessageType;
}

export const Message: React.FC<Props> = ({ message, type }) => {
  const classes = classNames({
    "text-sm mt-2": true,
    "text-success": type === MessageType.Success,
    "text-danger": type === MessageType.Danger,
  });

  return <p className={classes}>{message}</p>;
};
