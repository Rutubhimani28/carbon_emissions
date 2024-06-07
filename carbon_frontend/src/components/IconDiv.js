import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const IconDiv = styled(Box)(({ theme }) => ({
    position: "relative",
    top: 10,
    left: 15,
    marginBottom: 20,
    [theme.breakpoints.up('lg')]: {
        position: "absolute",
    },
}));
