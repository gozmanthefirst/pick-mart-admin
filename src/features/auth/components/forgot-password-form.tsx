"use client";

// External Imports
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

// Local Imports
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { Label } from "@/shared/components/label";
import { cn } from "@/shared/lib/utils/cn";

const forgotPwdSchema = z.object({
  email: z
    .string({ required_error: "An email is required" })
    .trim()
    .email({ message: "The email is invalid" }),
});

export const ForgotPasswordForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: forgotPwdSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {/* heading */}
      <div className="flex flex-col gap-1">
        <div className="relative mb-2 size-10">
          <Image src={"/images/logo.png"} alt="Logo" fill />
        </div>
        <h1 className={cn("text-3xl font-bold text-brand-500")}>
          Forgot password
        </h1>
        <p className="text-sm text-neutral-700">
          {`Remembered your password?`}{" "}
          <Link
            href={"/sign-in"}
            className="text-brand-400 lg:hover:underline lg:hover:underline-offset-2"
          >
            Sign in
          </Link>
          .
        </p>
      </div>

      {/* form */}
      <form
        id="forgot-pwd-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-5"
      >
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

        <div className="mt-4 flex flex-col gap-3">
          <Button form="forgot-pwd-form" className="w-full" size={"lg"}>
            Request reset link
          </Button>
        </div>
      </form>
    </div>
  );
};
