"use client";

import { FC } from "react";

import { TPage } from "../types";
import SignInGoogleForm from "@/features/auth/SignInGoogleForm";
import AuthLayout from "./AuthLayout";

const GoogleAuthorizationPage: FC<TPage> = ({ h1 }) => {
  return (
    <AuthLayout h1={h1}>
      <SignInGoogleForm />
    </AuthLayout>
  );
};
export default GoogleAuthorizationPage;
