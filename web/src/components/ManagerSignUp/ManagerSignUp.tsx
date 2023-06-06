import { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Grid } from '@mui/material';
import RoleForm from '../../components/ManagerRegister/RoleForm';
import UserForm from '../../components/ManagerRegister/UserForm';
import { RoleType } from '../../types';
import { createUser } from '../../services/userService';
import './ManagerSignUp.scss';

import FooterComp from '../../components/FooterComp/FooterComp';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';

type Props = {
  intl: any;
  isUserCreated: (res: boolean) => void;
};

const ManagerSignUp = ({ intl, isUserCreated }: Props) => {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
      <UserForm page={page} setPage={setPage} formData={formData} setFormData={setFormData} />
    ];
  }, [formData, page]);

  useEffect(() => {
    const submitForm = async () => {
      isUserCreated(false);
      setIsLoading(true);
      await createUser(formData)
        .then(() => {
          isUserCreated(true);
        })
        .catch((err) => {
          setPage(page - 1);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    if (page >= signUpPages.length) {
      submitForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, formData, signUpPages]);

  return (
    <>
      <LoadingSpinner isOpen={isLoading} />
      <Grid container className="sign-up-container">
        {signUpPages[page]}
      </Grid>
      <FooterComp />
    </>
  );
};

export default injectIntl(ManagerSignUp);
