/* eslint-disable jsx-a11y/alt-text */
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
// sections
import { LoginForm } from '../sections/auth/login';
import Logo from '../layouts/user/assets/images/logo.png'
import Header from '../layouts/user/components/header/header';
import Footer from '../layouts/user/components/footer/footer';


// ----------------------------------------------------------------------

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
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <div className='bg-img'>

        <StyledRoot>

          {/* {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )} */}

          <Container maxWidth="sm">
            <StyledContent>
              <div className='d-flex justify-content-center flex-column align-items-center'>
                <img src={Logo} width={200} />
                <Typography variant="h3" gutterBottom mb={4}>
                  Sign in
                </Typography>
              </div>
              <LoginForm />
            </StyledContent>
          </Container>
        </StyledRoot>
      </div>
    </>
  );
}
