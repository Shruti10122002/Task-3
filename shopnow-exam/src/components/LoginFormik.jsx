import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const LoginFormik = () => {
  const initialValues = { email: '', password: '' }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required')
  })

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Formik login values:', values)
    setSubmitting(false)
    resetForm()
  }

  return (
    <div className="page-container">
      <div className="form-card large">
        <h2 className="section-title">Login (Formik + Yup)</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                />
                <div className="error-text">
                  <ErrorMessage name="email" />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="form-input"
                />
                <div className="error-text">
                  <ErrorMessage name="password" />
                </div>
              </div>

              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default LoginFormik