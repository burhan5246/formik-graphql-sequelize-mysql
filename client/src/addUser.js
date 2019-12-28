import React, { Fragment, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { TextField } from "formik-material-ui";

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

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (user.validate) {
      addUser({ variables: user });
      setuser({});
      document.forms[0].reset();
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      setOpen(true);
    }
  }, [data]);

  const fileChange = e => {
    setuser({ ...user, [e.target.name]: e.target.files[0] });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">Data saved successfully</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
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
          values.validate = true;
          setuser({ ...user, ...values });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="name" label="Name" component={TextField} />
            <br />
            <Field
              name="email"
              label="Email"
              type="email"
              component={TextField}
            />
            <br />
            <Field name="phone" label="Phone" component={TextField} />
            <br />
            <Field name="address" label="Address" component={TextField} />
            <br />
            <Field name="zipcode" label="Zipcode" component={TextField} />
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
