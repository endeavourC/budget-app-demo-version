import React, { forwardRef, LegacyRef } from "react";
import classNames from "classnames";
import { Label, Message, MessageType } from "@/common/components/Forms";
import { FieldError } from "react-hook-form";

interface Props {
  label?: string;
  errors?: FieldError | undefined;
}

export const Input: React.FC<
  Props & React.InputHTMLAttributes<HTMLInputElement>
  // eslint-disable-next-line react/display-name
> = forwardRef(
  (
    { label, errors, ...props },
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    const inputClasses = classNames({
      "mt-2 rounded-lg": true,
      "border-background": !errors,
      "border-danger": errors,
    });

    return (
      <div className="flex flex-col w-full my-3">
        {label && <Label errors={errors} label={label} />}
        <input ref={ref} className={inputClasses} {...props} />
        {errors && (
          <Message type={MessageType.Danger} message={errors?.message} />
        )}
      </div>
    );
  }
);
