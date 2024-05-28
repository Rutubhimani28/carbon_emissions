import { Box, Button, Card, Container, FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from "yup";
import { Delete } from '@mui/icons-material';

const DigitalContent = () => {

    const [data, setData] = useState([])

    // -----------  validationSchema
    const validationSchema = yup.object({
        type: yup.string().required("Type is required"),
    });

    // -----------   initialValues
    const initialValues = {
        type: 'Emails',
        count: '',
        mb: '',
        noOfAttendees: '',
        noOfHours: '',
        serviceLifeOfLaptop: '',
        ef: '',
        emission: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        validate: (values) => {
            const errors = {};
            if (values?.type === "Emails" && values?.count === "" || values?.ef === "") {
                errors.count = "Count is required";
                errors.ef = "EF is required";
            }

            return errors;
        },
        onSubmit: async (values) => {
            setData((pre) => [...pre, { id: data?.length + 1, ...values }])
            formik.resetForm()
        },
    });
    const handeleDelete = (id) => {
        const filteData = data?.filter((item, i) => item?.id !== id)
        setData(filteData)
    }

    useEffect(() => {
        formik.setFieldValue("count", '')
        formik.setFieldValue("mb", '')
        formik.setFieldValue("noOfAttendees", '')
        formik.setFieldValue("noOfHours", '')
        formik.setFieldValue("serviceLifeOfLaptop", '')
        formik.setFieldValue("ef", '')
        formik.setFieldValue("emission", '')
    }, [formik?.values?.type])


    useEffect(() => {
        const { type, count, ef, mb, noOfAttendees, noOfHours, serviceLifeOfLaptop } = formik.values;

        if (type === "Emails") {
            formik.setFieldValue('emission', count * ef);
        } else if (type === "Attachment") {
            formik.setFieldValue('emission', mb * ef);
        } else if (type === "Laptop") {
            const emission = noOfAttendees * ef * (noOfHours / serviceLifeOfLaptop);
            formik.setFieldValue('emission', emission || "");
        }
    }, [formik.values]);

    return (
        <div>
            <Container maxWidth>
                <Card style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
                    <Box width={"50%"}>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >

                            <Grid item xs={12} sm={12} md={12}>
                                <FormControl fullWidth>
                                    <FormLabel>Type <span style={{ color: "red" }}>*</span></FormLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="type"
                                        name="type"
                                        label=""
                                        size='small'
                                        fullWidth
                                        value={formik.values.type || null}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.type &&
                                            Boolean(formik.errors.type)
                                        }
                                        helperText={
                                            formik.touched.type && formik.errors.type
                                        }
                                    >
                                        <MenuItem value="Emails">Emails</MenuItem>
                                        <MenuItem value="Attachment">Attachment </MenuItem>
                                        <MenuItem value="Laptop">Laptop </MenuItem>
                                    </Select>
                                    <FormHelperText>{formik.touched.type && formik.errors.type}</FormHelperText>
                                </FormControl>
                            </Grid>
                            {
                                formik.values.type === "Emails" &&

                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Count <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="count"
                                        name="count"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.count}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.count &&
                                            Boolean(formik.errors.count)
                                        }
                                        helperText={
                                            formik.touched.count && formik.errors.count
                                        }
                                    />
                                </Grid>
                            }
                            {
                                formik.values.type === "Attachment" &&
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">MB <span style={{ color: "red" }}>*</span></FormLabel>
                                    <TextField
                                        id="mb"
                                        name="mb"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.mb}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.mb &&
                                            Boolean(formik.errors.mb)
                                        }
                                        helperText={
                                            formik.touched.mb && formik.errors.mb
                                        }
                                    />
                                </Grid>

                            }
                            {
                                formik.values.type === "Laptop" &&
                                <>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">No.of Attendees <span style={{ color: "red" }}>*</span></FormLabel>
                                        <TextField
                                            id="noOfAttendees"
                                            name="noOfAttendees"
                                            label=""
                                            fullWidth
                                            size="small"
                                            value={formik.values.noOfAttendees}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.noOfAttendees &&
                                                Boolean(formik.errors.noOfAttendees)
                                            }
                                            helperText={
                                                formik.touched.noOfAttendees && formik.errors.noOfAttendees
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">No. of hours<span style={{ color: "red" }}>*</span></FormLabel>
                                        <TextField
                                            id="noOfHours"
                                            name="noOfHours"
                                            label=""
                                            fullWidth
                                            size="small"
                                            value={formik.values.noOfHours}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.noOfHours &&
                                                Boolean(formik.errors.noOfHours)
                                            }
                                            helperText={
                                                formik.touched.noOfHours && formik.errors.noOfHours
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Service life of Laptop<span style={{ color: "red" }}>*</span></FormLabel>
                                        <TextField
                                            id="serviceLifeOfLaptop"
                                            name="serviceLifeOfLaptop"
                                            label=""
                                            fullWidth
                                            size="small"
                                            value={formik.values.serviceLifeOfLaptop}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.serviceLifeOfLaptop &&
                                                Boolean(formik.errors.serviceLifeOfLaptop)
                                            }
                                            helperText={
                                                formik.touched.serviceLifeOfLaptop && formik.errors.serviceLifeOfLaptop
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">EF of laptop  (kg Co2e)<span style={{ color: "red" }}>*</span></FormLabel>
                                        <TextField
                                            id="ef"
                                            name="ef"
                                            label=""
                                            fullWidth
                                            size="small"
                                            value={formik.values.ef}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.ef &&
                                                Boolean(formik.errors.ef)
                                            }
                                            helperText={
                                                formik.touched.ef && formik.errors.ef
                                            }
                                        />
                                    </Grid>
                                </>

                            }
                            {
                                (formik.values.type === "Emails" || formik.values.type === "Attachment") && (
                                    <>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <FormLabel id="demo-row-radio-buttons-group-label">EF <span style={{ color: "red" }}>*</span></FormLabel>
                                            <TextField
                                                id="ef"
                                                name="ef"
                                                label=""
                                                fullWidth
                                                size="small"
                                                value={formik.values.ef}
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.ef &&
                                                    Boolean(formik.errors.ef)
                                                }
                                                helperText={
                                                    formik.touched.ef && formik.errors.ef
                                                }
                                            />
                                        </Grid>
                                    </>
                                )
                            }

                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel id="demo-row-radio-buttons-group-label">Emissions (/gm CO2e) <span style={{ color: "red" }}>*</span></FormLabel>
                                <TextField
                                    id="emission"
                                    name="emission"
                                    label=""
                                    fullWidth
                                    size="small"
                                    disabled
                                    value={formik.values.emission}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.emission &&
                                        Boolean(formik.errors.emission)
                                    }
                                    helperText={
                                        formik.touched.emission && formik.errors.emission
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"flex-end"}>
                                <Stack direction={"row"} spacing={2}>
                                    <Button variant='contained' onClick={() => { formik.handleSubmit(); }}>Calculate and Add To Footprint</Button>
                                    <Button variant='outlined' onClick={formik.resetForm}>Cancle</Button>
                                </Stack>

                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3}>
                                <Typography>Total Digital Content Footprint = 0.03 metric tons of CO2e</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3}>
                                <ul>
                                    {
                                        data?.map((item, index) => (
                                            <li>
                                                {`${item?.emission} metric tons: ${item?.type}`} <span><Delete onClick={() => handeleDelete(item?.id)} /></span>
                                            </li>

                                        ))
                                    }
                                </ul>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}

export default DigitalContent