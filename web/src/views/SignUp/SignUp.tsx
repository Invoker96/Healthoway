import { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import RoleForm from '../../components/SignUp/RoleForm';
import UserForm from '../../components/SignUp/UserForm';
import DisclaimerForm from '../../components/SignUp/DisclaimerForm';
import { RoleType } from '../../types';
import { createUser } from '../../services/userService';
import './SignUp.scss';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import MenuBar from '../../components/MenuBar/MenuBar';
import FooterComp from '../../components/FooterComp/FooterComp';
import AppSnackbar from '../../components/AppSnackbar/AppSnackbar';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
type Props = {
  intl: any;
};

const SignUp = ({ intl }: Props) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //state for form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userRole: RoleType.PATIENT,
    dob: new Date().toISOString().split('T')[0],
    pNum: '',
    username: ''
  });

  const signUpPages = useMemo(() => {
    return [
      <RoleForm page={page} setPage={setPage} formData={formData} setFormData={setFormData} />,
      <UserForm page={page} setPage={setPage} formData={formData} setFormData={setFormData} />,
      <DisclaimerForm page={page} setPage={setPage} formData={formData} setFormData={setFormData} />
    ];
  }, [formData, page]);

  useEffect(() => {
    const submitForm = async () => {
      await setIsError(false);
      await setLoading(true);
      await createUser(formData)
        .then((res) => {
          navigate('/', { state: { ...res.data } });
        })
        .catch((err) => {
          setPage(page - 1);
          console.log(err);
          setIsError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (page >= signUpPages.length) {
      submitForm();
    }
  }, [page, formData, signUpPages, navigate]);

  return (
    <>
      <AppSnackbar
        type="error"
        message={intl.formatMessage({
          id: 'userForm.createUser.error'
        })}
        open={isError}
      />
      <MenuBar title="" noBtn={true} />
      <Grid container className="sign-up-container">
        <LoadingSpinner isOpen={loading} />
        <Grid container justifyContent="left">
          <Button component={Link} to={'/'}>
            <ArrowLeftIcon />
            {intl.formatMessage({
              id: 'global.back_to_home'
            })}
          </Button>
        </Grid>
        {signUpPages[page]}
      </Grid>
      <FooterComp />
    </>
  );
};

export default injectIntl(SignUp);
