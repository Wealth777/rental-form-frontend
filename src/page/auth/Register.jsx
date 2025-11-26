import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function Register() {

    const [showpassword, setShowPassword] = useState('')

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName:  '',
            userName: '',
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            firstName: yup.string().required('First Name is required'),
            lastName: yup.string().required('Last Name is required'),
            userName: yup.string().required('User Name is required'),
            email: yup.string().required('email is required').email('Enter a valid email'),
            password: yup.string().required('pssword is required').min(8).max(10)
        }),
        onSubmit: async (values) =>{
            try{
                await axios.post('https://rental-form-backend-zap2.onrender.com/api/admin/reg', values)
                navigate('/admin/login')
            }catch(err){
                alert(err.message)
            }
        }
    })

    return (
        <>
            <div className="page-container">
                <div className='raduis1'></div>
                <div className='raduis2'></div>
                <div className='raduis3'></div>
                <div className='raduis4'></div>


                <div className="form">
                    <form>
                        <div className="form-header">
                            <h2>Register</h2>
                        </div>

                        <div className="form-content">
                            <div className="form-group">
                                <label>Firstname</label>
                                <div>
                                    <input type="text" name="firstName" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    <p>{formik.touched.firstName && formik.errors.firstName ? <small style={{ color: 'red' }}>{formik.errors.firstName}</small> : ''}</p>
                                    <input type="text" name="lastName" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    <p>{formik.touched.lastName && formik.errors.lastName ? <small style={{ color: 'red' }}>{formik.errors.lastName}</small> : ''}</p>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" name="userName" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p>{formik.touched.userName && formik.errors.userName ? <small style={{ color: 'red' }}>{formik.errors.userName}</small> : ''}</p>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p>{formik.touched.email && formik.errors.email ? <small style={{ color: 'red' }}>{formik.errors.email}</small> : ''}</p>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type={showpassword ? 'text' : "password"} name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <span onClick={() => setShowPassword(!showpassword)}>{showpassword ? 'hide' : 'show'}</span>
                                <p>{formik.touched.password && formik.errors.password ? <small style={{ color: 'red' }}>{formik.errors.password}</small> : ''}</p>
                            </div>

                            <div className="submit-cont">
                                <button type="button" className="submit-btn" onClick={formik.handleSubmit}>Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
