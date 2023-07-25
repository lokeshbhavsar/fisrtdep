import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, Formik, Field, FormikProvider, ErrorMessage } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';


import axios from 'axios';


// component
// import Iconify from '../../../../component/admin/Iconify';
// import CustomSnackbar from '../../../../component/client/commonComponents/Snackbar/CustomSnackbar';

// ----------------------------------------------------------------------

export default function Forme() {
  //   const navigate = useNavigate();
  //   const routeChange = () => {
  //     navigate('/login');
  //   };

  //   const [open, setOpen] = useState(false);
  //   const [msg, setMsg] = useState('');
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [isError, setIsError] = useState(false);

  //   const goToEmail = () => {
  //     navigate('/emailconfirm');
  //   };

  const initialValues = {
    email_id: 'loki@gmail.com',
    name:'loki',
    age:10,
    choice: 'sd',
  };

  //   const handleSnackClose = (event, reason) => {
  //     if (reason === 'clickaway') {
  //       return;
  //     }
  //     setOpen(false);
  //   };

  const onSubmit = (values, props) => {
    console.log('va',values);
    // axios
    // .post('http://65.2.51.139:8087/app/auth/payments', values, config)
  
  };

    const validationSchema = Yup.object().shape({
      email_id: Yup.string().email('Please enter valid email').required('Email is required'),
      choice: Yup.string().required('Choose atleat one product'),
    });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
           validationSchema={validationSchema}
      >
        {({ values, setFieldValue, errors, touched, isSubmitting }) => (
          
          <Form style={{ width: '500px', display: 'inline-block', marginTop: '50px' }}>
            <Box>
              <Field
                onChange={(e) => {
                  setFieldValue('email_id', e.target.value);
                  
                }}
                as={TextField}
                label="merchant-ide"
                name="email_id"
                placeholder="merchant-idd"
                fullWidth
                size="small"
                helperText={<ErrorMessage name="email_id" />}
                style={{ marginBottom: 10 }}
              />
              <Field
                onChange={(e) => {
                  setFieldValue('name', e.target.value);
                }}
                as={TextField}
                label="sercet-id"
                name="name"
                placeholder="sercet-id"
                fullWidth
                size="small"
                helperText={<ErrorMessage name="name" />}
                style={{ marginBottom: 10,display:(touched.age===true)?'':'none' }}
              />
              <Field
                onChange={(e) => {
                  setFieldValue('age', e.target.value);
                }}
                as={TextField}
                label="ur-domain"
                name="age"
                placeholder="ur-domain"
                fullWidth
                size="small"
                helperText={<ErrorMessage name="age" />}
                style={{ marginBottom: 10 }}
              />
              <Field
                onChange={(e) => {
                  setFieldValue('choice', e.target.value);
                }}
                as={TextField}
                label="url"
                name="choice"
                placeholder="url"
                fullWidth
                size="small"
                helperText={<ErrorMessage name="choice" />}
                style={{ marginBottom: 10 }}
              />
            </Box>
            <Grid container style={{ display: 'flex', justifyContent: 'space-between', marginTop: 25 }}>
              <Button
                // loading={isLoading}
                // loadingIndicator="Loading…"
                type="submit"
                color="primary"
                variant="contained"
                style={{ padding: '0.5em 2.5em' }}
              onClick={()=>{setTimeout(()=>{console.log(isSubmitting)},5000) }}
              >
                Buy
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}
