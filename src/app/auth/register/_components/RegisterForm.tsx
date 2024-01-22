"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React from "react";
import { FormData, schema } from "./schema";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";

interface IProps {
  csrfToken?: string;
}

export const RegisterForm: React.FC<IProps> = ({ csrfToken }) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const request = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (response.errors) {
      response.errors.forEach(
        (error: {
          field: "username" | "password" | "email";
          message: string;
        }) => {
          setError(error.field, {
            type: "manual",
            message: error.message,
          });
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div className="my-6">
        <Input
          placeholder="Enter your username"
          labelPlacement="outside"
          label="Username"
          isInvalid={!!errors.username}
          validationState={errors.username ? "invalid" : "valid"}
          errorMessage={errors.username?.message}
          {...register("username")}
        />
      </div>
      <div className="my-6">
        <Input
          placeholder="Enter your email"
          labelPlacement="outside"
          label="Email"
          isInvalid={!!errors.email}
          validationState={errors.email ? "invalid" : "valid"}
          errorMessage={errors.email?.message}
          {...register("email")}
        />
      </div>
      <div className="my-6">
        <Input
          placeholder="Enter your password"
          labelPlacement="outside"
          label="Password"
          type="password"
          isInvalid={!!errors.password}
          validationState={errors.password ? "invalid" : "valid"}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
      </div>

      <div className="flex items-center justify-start">
        <Button
          className="bg-primaryColor text-white"
          isLoading={isSubmitting}
          type="submit"
        >
          Register
        </Button>
        <Link
          href="/auth/login"
          className="text-sm ml-4 block text-primary hover:text-primaryColor"
        >
          or login
        </Link>
      </div>
    </form>
  );
};
