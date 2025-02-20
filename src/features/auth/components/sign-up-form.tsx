"use client";

// External Imports
import { useForm, useStore } from "@tanstack/react-form";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { z } from "zod";

// Local Imports
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { InputIcon } from "@/shared/components/input-icon";
import { Label } from "@/shared/components/label";
import { cn } from "@/shared/lib/utils/cn";

const signUpSchema = z
  .object({
    name: z
      .string({ required_error: "A name is required" })
      .trim()
      .min(3, { message: "The name must have at least 3 characters" })
      .max(128, { message: "The name can't have more than 128 characters" }),
    email: z
      .string({ required_error: "An email is required" })
      .trim()
      .email({ message: "The email is invalid" }),
    password: z
      .string({ required_error: "A password is required" })
      .trim()
      .min(8, { message: "The password must have at least 8 characters" })
      .max(32, { message: "The password can't have more than 32 characters" })
      .refine((data) => !/\s/.test(data), {
        message: "The password can't contain any whitespace",
      }),
    confirmPassword: z
      .string({ required_error: "The password must be confirmed" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"],
  });

export const SignUpForm = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const formErrors = useStore(form.store, (state) => state.errorMap);

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {/* heading */}
      <div className="flex flex-col gap-1">
        <div className="relative mb-2 size-10">
          <Image src={"/images/logo.png"} alt="Logo" fill />
        </div>
        <h1 className={cn("text-3xl font-bold text-brand-500")}>
          Sign up to PickMart
        </h1>
        <p className="text-sm text-neutral-700">
          Already have an account?{" "}
          <Link
            href={"/sign-in"}
            className="text-brand-500 lg:hover:underline lg:hover:underline-offset-2"
          >
            Sign in
          </Link>
          .
        </p>
      </div>

      {/* form */}
      <form
        id="sign-up-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-5"
      >
        {/* name */}
        <form.Field name="name">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Name</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                errors={field.state.meta.errors}
                placeholder="John Doe"
                type="text"
              />
              {field.state.meta.errorMap["onChange"] ? (
                <em className="-mt-1 text-xs text-red-600">
                  {field.state.meta.errorMap["onChange"]}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>

        {/* email */}
        <form.Field name="email">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                errors={field.state.meta.errors}
                placeholder="johndoe@email.com"
                type="email"
              />
              {field.state.meta.errorMap["onChange"] ? (
                <em className="-mt-1 text-xs text-red-600">
                  {field.state.meta.errorMap["onChange"]}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>

        {/* password */}
        <form.Field name="password">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Password</Label>
              <div className="relative">
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={field.state.meta.errors}
                  placeholder="password"
                  type={showPwd ? "text" : "password"}
                  className="pr-10"
                />

                <InputIcon
                  direction="end"
                  onClick={() => setShowPwd((state) => !state)}
                >
                  {showPwd ? <TbEyeOff size={18} /> : <TbEye size={18} />}
                </InputIcon>
              </div>
              {field.state.meta.errorMap["onChange"] ? (
                <em className="-mt-1 text-xs text-red-600">
                  {field.state.meta.errorMap["onChange"]}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>

        {/* confirm password */}
        <form.Field name="confirmPassword">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Confirm password</Label>

              <div className="relative">
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={formErrors.onChange ? field.state.meta.errors : []}
                  placeholder="confirm password"
                  type={showConfirmPwd ? "text" : "password"}
                  className="pr-10"
                />

                <InputIcon
                  direction="end"
                  onClick={() => setShowConfirmPwd((state) => !state)}
                >
                  {showConfirmPwd ? (
                    <TbEyeOff size={18} />
                  ) : (
                    <TbEye size={18} />
                  )}
                </InputIcon>
              </div>
              {field.state.meta.errorMap["onChange"] ? (
                <em className="-mt-1 text-xs text-red-600">
                  {field.state.meta.errorMap["onChange"]}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>

        <div className="mt-4">
          <Button form="sign-up-form" className="w-full" size={"lg"}>
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};
