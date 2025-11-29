import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function Login() {

    const [showpassword, setShowPassword] = useState('')

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string().email('Enter a vaild email').required('Email is required'),
            password: yup.string().required('Password is required').min(6).max(10)
        }),
        onSubmit: async (values) =>{
            try{
                const res = await axios.post('https://rental-form-backend-zap2.onrender.com/api/admin/login', values, {
                    headers: { "Content-Type": "application/json" },
                })

                if(res.status === 200){
                    const { token } = res.data
                    localStorage.setItem("token", token)
                }
                // alert('Login in')
                navigate('/admin/')
            }catch(err){
                console.log(err.message)
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
                            <h2>Login</h2>
                        </div>

                        <div className="form-content">

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <p>{formik.touched.email && formik.errors.email ? <small style={{ color: 'red' }}>{formik.errors.email}</small> : ''}</p>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type={showpassword ? 'text' : "password"} name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <span onClick={()=> {setShowPassword(!showpassword)}}>{showpassword ? 'hide' : 'show'}</span>
                                <p>{formik.touched.password && formik.errors.password ? <small style={{ color: 'red' }}>{formik.errors.password}</small>: ''}</p>
                            </div>

                            <div className="submit-cont">
                                <button type="button" className="submit-btn" onClick={formik.handleSubmit}>Login</button>
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '30px'}}>
                                <p>You don't have an account before? <Link style={{color: 'white', fontFamily: '"Inter", sans-serif'}} to={'/admin/reg'}>Register</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
