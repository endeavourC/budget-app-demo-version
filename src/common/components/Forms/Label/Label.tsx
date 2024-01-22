import classNames from "classnames";
import { FieldError } from "react-hook-form";

interface Props {
  label: string;
  errors?: FieldError | undefined;
}

export const Label: React.FC<Props> = ({ label, errors }) => {
  const classes = classNames({
    "text-secondary dark:text-white": !errors,
    "text-danger": errors,
  });

  return <label className={classes}>{label}</label>;
};
