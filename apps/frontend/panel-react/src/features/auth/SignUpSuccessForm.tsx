import { FC } from 'react';

import FormBase from '@/shared/ui/form/FormBase';
import FormButton from '@/shared/ui/form/FormButton';
import useTranslate from '@/shared/hooks/useTranslate';
import FormAlert from '@/shared/ui/form/FormAlert';

const SignUpSuccessForm: FC<{
  onClose?: () => void;
}> = ({ onClose }) => {
  const t = useTranslate();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose?.();
  };

  return (
    <FormBase onSubmit={submitHandler}>
      <FormAlert severity="success">{t.registrationSuccessText}</FormAlert>
      <FormButton type="submit" fullWidth>
        {t.signIn}
      </FormButton>
    </FormBase>
  );
};
export default SignUpSuccessForm;
