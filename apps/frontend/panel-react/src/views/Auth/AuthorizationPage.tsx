"use client";

import { FC } from "react";

import SignInForm from "@/features/auth/SignInForm";
import { TPage } from "../types";
import AuthLayout from "./AuthLayout";

const AuthorizationPage: FC<TPage> = ({ h1 }) => {
  return (
    <AuthLayout h1={h1}>
      <SignInForm />
    </AuthLayout>
  );
};
export default AuthorizationPage;
