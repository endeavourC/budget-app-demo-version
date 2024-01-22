"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React from "react";
import { FormData, schema } from "./schema";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";

interface IProps {
  csrfToken?: string;
}

export const LoginForm: React.FC<IProps> = ({ csrfToken }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const request = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (request?.error) {
      const error = {
        type: "manual",
        message: request.error,
      };
      setError("username", error);
      setError("password", error);
    } else {
      router.push("/");
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
          errorMessage={errors.username?.message}
          {...register("username")}
        />
      </div>

      <div className="my-6">
        <Input
          placeholder="Enter your password"
          labelPlacement="outside"
          type="password"
          label="Password"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
      </div>

      <div className="flex items-center justify-start">
        <Button
          variant="shadow"
          className="bg-primaryColor text-white"
          isLoading={isSubmitting}
          type="submit"
        >
          Login
        </Button>
        <Link
          href="/auth/register"
          className="text-sm ml-4 block text-primary hover:text-primaryColor"
        >
          or create account
        </Link>
      </div>
    </form>
  );
};
