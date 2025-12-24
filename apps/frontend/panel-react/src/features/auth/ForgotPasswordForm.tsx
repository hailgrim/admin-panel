import { FC, useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import FormBase from "@/shared/ui/form/FormBase";
import FormField from "@/shared/ui/form/FormField";
import FormButton from "@/shared/ui/form/FormButton";
import FormLink from "@/shared/ui/form/FormLink";
import FormAlert from "@/shared/ui/form/FormAlert";
import CustomModal from "@/shared/ui/modal/CustomModal";
import ResetPasswordForm from "./ResetPasswordForm";
import useTranslate from "@/shared/hooks/useTranslate";
import useTranslateRef from "@/shared/hooks/useTranslateRef";
import useLanguageRef from "@/shared/hooks/useLanguageRef";
import { getErrorText, ROUTES } from "@ap/shared/dist/libs";
import authApi from "@/entities/auth/api";

const ForgotPasswordForm: FC = () => {
  const lRef = useLanguageRef();
  const tRef = useTranslateRef();
  const t = useTranslate();
  const [email, setEmail] = useState("");
  const [resetModal, setResetModal] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [forgotPassword, { isSuccess, error, isFetching }] =
    authApi.useLazyForgotPasswordQuery();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email) {
      forgotPassword({ email });
    }
  };

  useEffect(() => {
    if (isFetching) {
      setErrorText(null);
    }
  }, [isFetching]);

  useEffect(() => {
    if (error) {
      switch ((error as FetchBaseQueryError).status) {
        case 404:
          setErrorText(tRef.current.wrongEmail);
          break;
        default:
          setErrorText(getErrorText(error, lRef.current));
          break;
      }
    }
  }, [error, tRef, lRef]);

  useEffect(() => {
    if (isSuccess) {
      setResetModal(true);
    }
  }, [isSuccess]);

  return (
    <>
      <FormBase onSubmit={submitHandler}>
        {errorText && <FormAlert severity="error">{errorText}</FormAlert>}
        <FormField
          required
          name="email"
          type="email"
          label={t.email}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoFocus
          disabled={isFetching}
        />
        <FormButton type="submit" fullWidth loading={isFetching}>
          {t.confirm}
        </FormButton>
        <FormLink href={ROUTES.ui.signIn} mui={{ align: "center" }}>
          {t.signInText}
        </FormLink>
        <FormLink href={ROUTES.ui.signUp} mui={{ align: "center" }}>
          {t.signUpText}
        </FormLink>
      </FormBase>
      <CustomModal
        open={resetModal}
        title={t.resetPassword}
        onClose={() => setResetModal(false)}
      >
        <ResetPasswordForm email={email} onClose={() => setResetModal(false)} />
      </CustomModal>
    </>
  );
};
export default ForgotPasswordForm;
