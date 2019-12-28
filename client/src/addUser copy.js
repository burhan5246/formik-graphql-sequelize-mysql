import React, { Fragment, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  LinearProgress,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel
} from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";
import {
  fieldToTextField,
  TextField,
  TextFieldProps,
  Select,
  Switch
} from "formik-material-ui";

const ADD_USER = gql`
  mutation(
    $name: String
    $email: String
    $phone: String
    $address: String
    $zipcode: String
    $profile: Upload
    $document: Upload
  ) {
    addUser(
      name: $name
      email: $email
      phone: $phone
      address: $address
      zipcode: $zipcode
      profile: $profile
      document: $document
    ) {
      id
      name
    }
  }
`;

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  zipcode: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
});

export default () => {
  const [user, setuser] = useState({});
  const [addUser, { data }] = useMutation(ADD_USER);

  const handleChange = e => {
    setuser({ ...user, [e.target.name]: e.target.value });
    console.log("here comes");
  };

  const fileChange = e => {
    setuser({ ...user, [e.target.name]: e.target.files[0] });
  };

  return (
    <div>
      <h1>Form</h1>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
          address: "",
          zipcode: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
          //addUser({ variables: user });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="name"
              label="Name"
              component={TextField}
              onChange={handleChange}
            />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <br />

            <Field
              name="email"
              label="Email"
              type="email"
              component={TextField}
              onChange={handleChange}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <br />

            <Field
              name="phone"
              label="Phone"
              component={TextField}
              onChange={handleChange}
            />
            {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
            <br />

            <Field
              name="address"
              label="Address"
              component={TextField}
              onChange={handleChange}
            />
            {errors.address && touched.address ? (
              <div>{errors.address}</div>
            ) : null}
            <br />

            <Field
              name="zipcode"
              label="Zipcode"
              component={TextField}
              onChange={handleChange}
            />
            {errors.zipcode && touched.zipcode ? (
              <div>{errors.zipcode}</div>
            ) : null}
            <br />
            <br />
            <Button variant="contained" component="label">
              Profile
              <input
                type="file"
                name="profile"
                onChange={fileChange}
                style={{ display: "none" }}
              />
            </Button>

            <br />
            <br />
            <Button variant="contained" component="label">
              Document
              <input
                type="file"
                name="document"
                onChange={fileChange}
                style={{ display: "none" }}
              />
            </Button>

            <br />
            <br />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
