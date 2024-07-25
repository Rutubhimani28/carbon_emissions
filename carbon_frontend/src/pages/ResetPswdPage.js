import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, TextField, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Logo from '../layouts/user/assets/images/logo5.gif';
import { apiput } from '../service/api';

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
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
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    console.log(searchParams.get('token'));

    const initialValues = {
        newPassword: "",
        confirmPassword: "",
    };

    const validationSchema = yup.object({
        newPassword: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
        // confirmPassword: yup.string().required("Confirm Password is required"),
        confirmPassword: yup.string()
            .oneOf([yup.ref('newPassword'), null], 'Passwords must match') // Custom validation
            .required("Confirm Password is required"),
    });

    const Adddata = async (values) => {
        setIsLoading(true);
        const { newPassword, confirmPassword } = values;
        const data = { newPassword, confirmPassword, token: searchParams.get('token') };
        const result = await apiput('api/auth/password-reset', data);

        if (result && result.status === 200) {
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
                                    Reset Password
                                </Typography>
                            </div>
                            <div style={{ marginBottom: '18px' }}>
                                <form onSubmit={formik.handleSubmit}>
                                    <Stack spacing={3} mb={2} className='Login'>
                                        <TextField
                                            name="newPassword"
                                            label="Password"
                                            type='password'
                                            value={formik.values.newPassword}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.newPassword &&
                                                Boolean(formik.errors.newPassword)
                                            }
                                            helperText={
                                                formik.touched.newPassword && formik.errors.newPassword
                                            }
                                        />
                                        <TextField
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type='password'
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.confirmPassword &&
                                                Boolean(formik.errors.confirmPassword)
                                            }
                                            helperText={
                                                formik.touched.confirmPassword && formik.errors.confirmPassword
                                            }
                                        />
                                    </Stack>
                                    <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={!!isLoading} style={{ background: "#054723", color: "white" }}>
                                        {isLoading ? <CircularProgress style={{ color: "white" }} /> : 'Reset'}
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
