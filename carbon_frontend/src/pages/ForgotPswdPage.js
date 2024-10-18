import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, TextField, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Logo from '../layouts/user/assets/images/logo5.gif';
import { apipost } from '../service/api';

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    // minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(18, 0),
}));

export default function ForgotPswdPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        emailAddress: "",
    };

    const validationSchema = yup.object({
        emailAddress: yup.string().email('Invalid email').required("Email is required"),
    });

    const Adddata = async (values) => {
        setIsLoading(true);
        const data = { loginId: values?.emailAddress };
        const result = await apipost('api/auth/password-forgot', data);

        if (result && result.status === 200) {
            // navigate('/dashboard/home');
            navigate('/login');
        }

        setIsLoading(false);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            Adddata(values);
        },
    });

    return (
        <>
            <div className='bg-img'>
                <StyledRoot>
                    <Container maxWidth="sm">
                        <StyledContent>
                            <div className='d-flex justify-content-center flex-column align-items-center'>
                                <img src={Logo} width={300} alt="Sirat.earth Logo" />
                                <Typography variant="h3" gutterBottom mb={4} color="#054723" className='mt-4'>
                                    Forgot Password
                                </Typography>
                            </div>
                            <div style={{ marginBottom: '18px' }}>
                                <form onSubmit={formik.handleSubmit}>
                                    <Stack spacing={3} mb={2} className='Login'>
                                        <TextField name="emailAddress" label="Email" value={formik.values.emailAddress}
                                            onChange={formik.handleChange} error={formik.touched.emailAddress &&
                                                Boolean(formik.errors.emailAddress)} helperText={formik.touched.emailAddress &&
                                                    formik.errors.emailAddress} />
                                    </Stack>
                                    <LoadingButton fullWidth size="large" type="submit" variant="contained"
                                        disabled={!!isLoading} style={{ background: "#054723", color: "white" }}>
                                        {isLoading ?
                                            <CircularProgress style={{ color: "white" }} /> : 'Send Reset Link'}
                                    </LoadingButton>
                                </form>
                            </div>
                        </StyledContent>
                    </Container>
                </StyledRoot>
            </div>
        </>
    );
};