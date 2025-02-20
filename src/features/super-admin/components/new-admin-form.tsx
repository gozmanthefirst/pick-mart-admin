"use client";

// External Imports
import { useForm, useStore } from "@tanstack/react-form";
import { useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { z } from "zod";

// Local Imports
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { InputIcon } from "@/shared/components/input-icon";
import { Label } from "@/shared/components/label";

const newAdminSchema = z
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

export const NewAdminForm = () => {
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
      onChange: newAdminSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const formErrors = useStore(form.store, (state) => state.errorMap);

  return (
    <div className="flex w-full items-center flex-col gap-6">
      <form
        id="new-admin-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-5 w-full max-w-3xl"
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
                placeholder="New Admin"
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
                placeholder="newadmin@email.com"
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
          <Button form="new-admin-form" className="w-full" size={"lg"}>
            Create new admin
          </Button>
        </div>
      </form>
    </div>
  );
};
