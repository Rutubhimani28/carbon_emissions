import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LoadingButton } from '@mui/lab';
import { Box, Button, CircularProgress, Container, FormLabel, Grid, Stack, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { EmailEditor } from 'react-email-editor';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import { apipost } from '../../service/api';

const Add = () => {
    const emailEditorRef = useRef(null);
    const [preview, setPreview] = useState(false);
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate()
    const userid = sessionStorage.getItem('user_id');

    const togglePreview = () => {
        if (preview) {
            emailEditorRef.current?.editor?.hidePreview();
            setPreview(false);
        } else {
            emailEditorRef.current?.editor?.showPreview('desktop');
            setPreview(true);
        }
    };

    const saveDesign = () => {
        setIsLoading(true)
        try {
            if (name !== "" && emailEditorRef.current && emailEditorRef.current.editor.exportHtml) {
                emailEditorRef.current.editor?.exportHtml(async (allData) => {

                    const { html, design } = allData

                    const data = {
                        html,
                        design,
                        name,
                        createdBy: userid
                    }

                    const result = await apipost('emailtemplate/add', data)
                    if (result && result.status === 200 || result.status === 201) {
                        setName('')
                        navigate('/dashboard/emailtemplate')
                    }
                });
            } else {
                toast.error("Template Name is required")
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)

    };

    const back = () => {
        navigate('/dashboard/emailtemplate')
    }

    return (
        <div>
            <Container maxWidth>
                <Grid container display="flex" alignItems="center">
                    <Grid container display="flex" alignItems="center">
                        <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                            <Header
                                title="Create Template"
                            />
                            <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                                <Button variant="contained" color="secondary" onClick={togglePreview}>{preview ? "Hide Preview" : "Show Preview"}</Button>
                                <LoadingButton onClick={saveDesign} variant='contained' color='secondary' disabled={!!isLoading}>
                                    {isLoading ? <CircularProgress size={27} /> : 'Save'}
                                </LoadingButton>
                                <Button variant="contained" color="secondary" startIcon={<ArrowBackIosIcon />} onClick={back}>Back</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <FormLabel>Template Name</FormLabel>
                <TextField
                    name='policyStartDate'
                    type=''
                    size='small'
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Box height={"680px"} bgcolor={"#edeff1"} className="editerHeight" mt={1}>
                    <EmailEditor ref={emailEditorRef} />
                </Box>
            </Container>
        </div>
    )
}

export default Add
