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

const changePwdSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "The current password is required" })
      .trim()
      .min(8, {
        message: "The current password must have at least 8 characters",
      })
      .max(32, {
        message: "The current password can't have more than 32 characters",
      })
      .refine((data) => !/\s/.test(data), {
        message: "The current password can't contain any whitespace",
      }),
    newPassword: z
      .string({ required_error: "The new password is required" })
      .trim()
      .min(8, { message: "The new password must have at least 8 characters" })
      .max(32, {
        message: "The new password can't have more than 32 characters",
      })
      .refine((data) => !/\s/.test(data), {
        message: "The new password can't contain any whitespace",
      }),
    confirmNewPassword: z
      .string({ required_error: "The new password must be confirmed" })
      .trim(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "The passwords do not match",
    path: ["confirmNewPassword"],
  });

export const ChangePasswordForm = () => {
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmNewPwd, setShowConfirmNewPwd] = useState(false);

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validators: {
      onChange: changePwdSchema,
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
          Change Password
        </h1>
        <p className="text-sm text-neutral-700">
          Changed your mind?{" "}
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
        id="change-pwd-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-5"
      >
        {/* current password */}
        <form.Field name="currentPassword">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Current password</Label>
              <div className="relative">
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={field.state.meta.errors}
                  placeholder="password"
                  type={showCurrentPwd ? "text" : "password"}
                  className="pr-10"
                />

                <InputIcon
                  direction="end"
                  onClick={() => setShowCurrentPwd((state) => !state)}
                >
                  {showCurrentPwd ? (
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

        {/* new password */}
        <form.Field name="newPassword">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>New password</Label>
              <div className="relative">
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={field.state.meta.errors}
                  placeholder="password"
                  type={showNewPwd ? "text" : "password"}
                  className="pr-10"
                />

                <InputIcon
                  direction="end"
                  onClick={() => setShowNewPwd((state) => !state)}
                >
                  {showNewPwd ? <TbEyeOff size={18} /> : <TbEye size={18} />}
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

        {/* confirm new password */}
        <form.Field name="confirmNewPassword">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Confirm new password</Label>

              <div className="relative">
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errors={formErrors.onChange ? field.state.meta.errors : []}
                  placeholder="confirm password"
                  type={showConfirmNewPwd ? "text" : "password"}
                  className="pr-10"
                />

                <InputIcon
                  direction="end"
                  onClick={() => setShowConfirmNewPwd((state) => !state)}
                >
                  {showConfirmNewPwd ? (
                    <TbEyeOff size={18} />
                  ) : (
                    <TbEye size={18} />
                  )}
                </InputIcon>
              </div>
              {formErrors.onChange && field.state.meta.errorMap["onChange"] ? (
                <em className="-mt-1 text-xs text-red-600">
                  {field.state.meta.errorMap["onChange"]}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>

        <div className="mt-4 flex flex-col gap-3">
          <Button form="sign-up-form" className="w-full" size={"lg"}>
            Change password
          </Button>
        </div>
      </form>
    </div>
  );
};
