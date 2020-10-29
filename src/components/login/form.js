import React from 'react'
import { Button, Grid, makeStyles, Link } from '@material-ui/core'
import { TextField, CheckboxWithLabel } from 'formik-material-ui'
import { Form, Field, Formik } from 'formik'
import * as yup from 'yup'
import auth from '../../services/auth'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { actions, useAppState, variants } from '../../state/local'

const formValuesSchema = yup.object({
    username: yup
        .string()
        .required(),
    password: yup
        .string()
        .required(),
    remember: yup
        .boolean()
        .notRequired(),
})

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const FormView = props => {
    const classes = useStyles()
    const { submitForm, isSubmitting } = props
    return (
        <Form className={classes.form}>
            <Field
                type='text'
                label='User name'
                name="username"
                component={TextField}
                autoComplete="username"
                autoFocus
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <Field
                type="password"
                label="Password"
                name="password"
                component={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                autoComplete="current-password"
            />
            <Field
                name='remember'
                Label={{ label: 'Remember me' }}
                component={CheckboxWithLabel}
                color="primary"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={submitForm}
                disabled={isSubmitting}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link to="/forgot-password" component={RouterLink} variant='body2'>
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/signup" component={RouterLink} variant='body2'>
                        {'Don\'t have an account? Sign Up'}
                    </Link>
                </Grid>
            </Grid>
        </Form>
    )
}

export default function LoginForm() {
    const history = useHistory()
    const initialValues = {
        username: '',
        password: '',
        remember: true,
    }
    const [, dispatch] = useAppState()
    const handleSubmit = (values, helpers) => {
        auth.login(values).then(() => {
            dispatch({
                type: actions.SHOW_MESSAGE,
                payload: {
                    message: 'Login succeeded',
                    variant: variants.SUCCESS,
                },
            })
            history.push('/')
        }).catch(error => {
            helpers.setSubmitting(false)
            if (error?.response?.data?.message)
                dispatch({
                    type: actions.SHOW_MESSAGE,
                    payload: {
                        message: error.response.data.message,
                        variant: variants.ERROR,
                    },
                })
        })
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={formValuesSchema}>
            {props => <FormView {...props} />}
        </Formik>
    )
}