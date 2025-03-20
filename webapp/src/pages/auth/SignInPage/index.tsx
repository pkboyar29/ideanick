import { zSignInTrpcInput } from '@ideanick/backend/src/router/auth/signIn/input';
import { Button } from '../../../components/Button';
import { FormItems } from '../../../components/FormItems';
import { Alert } from '../../../components/Alert';
import { Input } from '../../../components/Input';
import { Segment } from '../../../components/Segment';
import { trpc } from '../../../lib/trpc';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { getAllIdeasRoute } from '../../../lib/routes';
import { useForm } from '../../../lib/form';
import { withPageWrapper } from '../../../lib/pageWrapper';

export const SignInPage = withPageWrapper({
  redirectAuthorized: true,
})(() => {
  const navigate = useNavigate();

  const trpcUtils = trpc.useUtils();
  const signIn = trpc.signIn.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values);
      Cookies.set('token', token, { expires: 99999 });
      trpcUtils.invalidate();
      navigate(getAllIdeasRoute());
    },
  });

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  );
});
