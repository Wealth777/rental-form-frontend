import { useRef, useEffect } from "react"
import '../styles/form.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Form() {

    const navigate = useNavigate()

    const canvasRef = useRef(null)
    const isDrawing = useRef(false)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.strokeStyle = "#000"
    }, [])

    const getPos = e => {
        const rect = canvasRef.current.getBoundingClientRect()
        if (e.touches) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            }
        }
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    const start = e => {
        const pos = getPos(e)
        const ctx = canvasRef.current.getContext("2d")
        ctx.beginPath()
        ctx.moveTo(pos.x, pos.y)
        isDrawing.current = true
    }

    const draw = e => {
        if (!isDrawing.current) return
        const pos = getPos(e)
        const ctx = canvasRef.current.getContext("2d")
        ctx.lineTo(pos.x, pos.y)
        ctx.stroke()
    }

    const end = () => {
        isDrawing.current = false
        const data = canvasRef.current.toDataURL("image/png")
        formik.setFieldValue("signature", data)
    }

    const clearBoard = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        formik.setFieldValue("signature", "")
    }

    const formik = useFormik({
        initialValues: {
            rentalProperty: '', firstName: '', lastName: '', email: '', phoneNumber: '', address: '', stateAndCity: '', MarreitalStatus: '', dateOfBirth: '', ownCar: '', occupation: '', wantDocument: '', startStayingDate: '', pet: '', leaseDuration: '', movingInDate: '', payingForRent: '', applicationFee: '', secureHouse: '', eviction: '', signature: ''
        },
        validationSchema: yup.object({
            rentalProperty: yup.string().required('This field is required'),
            firstName: yup.string().required('We need your name'),
            lastName: yup.string().required('We need your name'),
            email: yup.string().email('Enter a valid email').required('Email is required'),
            phoneNumber: yup.string().required('Phone number is required'),
            address: yup.string().required('Address is required'),
            stateAndCity: yup.string().required('This field is required'),
            MarreitalStatus: yup.string().required('This field is required'),
            dateOfBirth: yup.date().required('Date of birth is required'),
            ownCar: yup.string().required('This field is required'),
            occupation: yup.string().required('Occupation is required'),
            wantDocument: yup.string().required('This field is required'),
            startStayingDate: yup.date().required('This field is required'),
            pet: yup.string().required('This field is required'),
            leaseDuration: yup.date().required('This field is required'),
            movingInDate: yup.date().required('This field is required'),
            payingForRent: yup.string().required('This field is required'),
            applicationFee: yup.string().required('This field is required'),
            secureHouse: yup.string().required('This field is required'),
            eviction: yup.string().required('This field is required'),
            signature: yup.string().required('Please sign to proceed')
        }),
        onSubmit:  async (values) => {
            try{
                await axios.post("https://rental-form-backend-zap2.onrender.com/api/users/form", values)
                // alert('Form submitted successfully!')
                navigate('/success')
            }catch(err){
                alert(err.message)
            }
        }
    })

    return (
        <>
            <div>
                <div className="form-page-container">
                    <div className='raduis1'></div>
                    <div className='raduis2'></div>
                    <div className='raduis3'></div>
                    <div className='raduis4'></div>

                    <div className='form'>
                        <form>
                            <div className="form-header">
                                <h2>RENTAL APPLICATION FORM</h2>
                            </div>

                            <div className="form-content">
                                <div className="form-group">
                                    <label><span>1.</span> RENTAL PROPERTY</label>
                                    <p>For inquiries about the rental property, please contactJohn atEmail Address: rentalestateagent1@gmail.comRENTAL PROPERTYDate of Availability.January 10 2024Type of Lease Term: Fixed TermMinimum Term of Lease : 12 monthsMonthly Rent Payment, Contact Owner Initial Security Deposit: $600Application Fee: $65.00</p>
                                    <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} name="rentalProperty" ></textarea>
                                    {formik.touched.rentalProperty && formik.errors.rentalProperty ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.rentalProperty}</small> : ''}
                                </div>

                                <div className="form-group">
                                    <label><span>2.</span> Full Name </label>
                                    <div>
                                        <input type="text" name="firstName" placeholder='First Name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {formik.touched.firstName && formik.errors.firstName ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.firstName}</small> : ''}
                                        <input type="text" name="lastName" placeholder='Last Name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {formik.touched.lastName && formik.errors.lastName ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.lastName}</small> : ''}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label><span>3.</span> Email </label>
                                    <input type="email" name="email" placeholder='example@gmail.com' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.email && formik.errors.email ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.email}</small> : ''}
                                </div>

                                <div className="form-group">
                                    <label><span>4.</span> Address </label>
                                    <input type="text" name="address" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.address && formik.errors.address ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.address}</small> : ''}
                                </div>

                                <div className="form-group">
                                    <label><span>5.</span> Phone Number </label>
                                    <input type="number" name="phoneNumber" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.phoneNumber}</small> : ''}
                                </div>

                                <div className="form-group">
                                    <label><span>6.</span> State, City n Zip </label>
                                    <input type="text" name="stateAndCity" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.stateAndCity && formik.errors.stateAndCity ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.stateAndCity}</small> : ''}
                                </div>

                                <div className="form-group">
                                    <label><span>7.</span> Are you Married? </label>
                                    <div>       
                                        <div className='checkbox-cont'>
                                            <input type="checkbox" name="MarreitalStatus" className='checkbox' value='Yes' checked={formik.values.MarreitalStatus === "Yes"} onChange={() => formik.setFieldValue("MarreitalStatus", "Yes")} />
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className='checkbox-cont'>
                                            <input type="checkbox" name="MarreitalStatus" className='checkbox' value='No' checked={formik.values.MarreitalStatus === "No"} onChange={() => formik.setFieldValue("MarreitalStatus", "No")} />
                                            <label htmlFor="">No</label>
                                        </div>
                                    {formik.touched.MarreitalStatus && formik.errors.MarreitalStatus ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.MarreitalStatus}</small> : ''}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label><span>8.</span> Date of birth </label>
                                    <input type="date" name="dateOfBirth" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.dateOfBirth}</small> : ''}
                                </div>

                                <div className="form-group">
                                    <label><span>9.</span> Do you have a car </label>
                                    <div>
                                        <div className='checkbox-cont'>
                                            <input type="checkbox" name="ownCar" className='checkbox' value='Yes' checked={formik.values.ownCar === "Yes"} onChange={() => formik.setFieldValue("ownCar", "Yes")} />
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className='checkbox-cont'>
                                            <input type="checkbox" name="ownCar" className='checkbox' value='No' checked={formik.values.ownCar === "No"} onChange={() => formik.setFieldValue("ownCar", "No")} />
                                            <label htmlFor="">No</label>
                                        </div>
                                        {formik.touched.ownCar && formik.errors.ownCar ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.ownCar}</small> : ''}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label><span>10.</span> What’s your occupation? </label>
                                    <input type="text" name="occupation" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.occupation && formik.errors.occupation ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.occupation}</small> : ''}
                                </div>

                                <div className="form-group">
                                    <label><span>11.</span> How soon do you want the key and documents? </label>
                                    <input type="text" name="wantDocument" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.wantDocument && formik.errors.wantDocument ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.wantDocument}</small> : ''}
                                </div>

                                <div className="form-group">
                                    <label><span>12.</span> When would you like start staying? </label>
                                    <input type="date" name="startStayingDate" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.startStayingDate && formik.errors.startStayingDate ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.startStayingDate}</small> : ''}
                                </div>

                                <div className="form-group">
                                    <label><span>13.</span> Do you have pets? </label>
                                    <div>
                                        <div className='checkbox-cont'>
                                            <input type="checkbox" name="pet" className='checkbox' value='Yes' checked={formik.values.pet === "Yes"} onChange={() => formik.setFieldValue("pet", "Yes")} />
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className='checkbox-cont'>
                                            <input type="checkbox" name="pet" className='checkbox' value='No' checked={formik.values.pet === "No"} onChange={() => formik.setFieldValue("pet", "No")} />
                                            <label htmlFor="">No</label>
                                        </div>
                                        {formik.touched.pet && formik.errors.pet ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.pet}</small> : ''}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label><span>14.</span> How long lease are you looking for? </label>
                                    <input type="date" name="leaseDuration" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.leaseDuration && formik.errors.leaseDuration ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.leaseDuration}</small> : ''}
                                </div>

                                <div className="form-group">
                                    <label><span>15.</span> How soon do you intend moving in? </label>
                                    <input type="date" name="movingInDate" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.movingInDate && formik.errors.movingInDate ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.movingInDate}</small> : ''}
                                </div>

                                <div className="form-group">
                                    <label><span>16.</span> How soon are you paying for the rent and have the keys? </label>
                                    <input type="text" name="payingForRent" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.payingForRent && formik.errors.payingForRent ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.payingForRent}</small> : ''}
                                </div>

                                <div className="form-group">
                                    <label><span>17.</span> Application Fee of $65</label>
                                    <div className='fee'>
                                        <div>
                                            <input type="checkbox" name="applicationFee" className='checkbox' value='Cashapp' checked={formik.values.applicationFee === 'Cashapp'} onChange={()=> formik.setFieldValue('applicationFee', 'Cashapp')} />
                                            <label htmlFor="">Cashapp</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="applicationFee" className='checkbox' value='PayPal' checked={formik.values.applicationFee === 'PayPal'} onChange={()=> formik.setFieldValue('applicationFee', 'PayPal')} />
                                            <label htmlFor="">PayPal</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="applicationFee" className='checkbox' value='Zelle' checked={formik.values.applicationFee === 'Zelle'} onChange={()=> formik.setFieldValue('applicationFee', 'Zelle')} />
                                            <label htmlFor="">Zelle</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="applicationFee" className='checkbox' value='Chime' checked={formik.values.applicationFee === 'Chime'} onChange={()=> formik.setFieldValue('applicationFee', 'Chime')} />
                                            <label htmlFor="">Chime</label>
                                        </div>

                                        <div>
                                            <input type="checkbox" name="applicationFee" className='checkbox' value='Venmo' checked={formik.values.applicationFee === 'Venmo'} onChange={()=> formik.setFieldValue('applicationFee', 'Venmo')} />
                                            <label htmlFor="">Venmo</label>
                                        </div>
                                        { formik.touched.applicationFee && formik.errors.applicationFee ? <small style={{color: 'red', fontSize: '.8rem'}}>{formik.errors.applicationFee}</small> : '' }
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label><span>18.</span> Are you willing to pay for the application fee now and get approved for the house so your name can be secured immediately?</label>
                                    <div>
                                        <div className='checkbox-cont'>
                                            <input type="checkbox" name="secureHouse" className='checkbox' checked={formik.values.secureHouse === 'Yes'} onChange={()=> formik.setFieldValue('secureHouse', 'Yes')} />
                                            <label htmlFor="">Yes</label>
                                        </div>
                                        <div className='checkbox-cont'>
                                            <input type="checkbox" name="secureHouse" className='checkbox' checked={formik.values.secureHouse === 'No'} onChange={()=> formik.setFieldValue('secureHouse', 'No')} />
                                            <label htmlFor="">No</label>
                                        </div>
                                        { formik.touched.secureHouse && formik.errors.secureHouse ? <small style={{color: 'red', fontSize: '.8rem'}}>{formik.errors.secureHouse}</small> : '' }
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label><span>19.</span> Any Previous eviction?</label>
                                    <input type="text" name="eviction" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.eviction && formik.errors.eviction ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.eviction}</small> : ''}
                                </div>

                                <div className="signature-wrapper">
                                    <label><span>20.</span> Signature</label>
                                    <canvas name='signature' ref={canvasRef} width={850} height={200} className="signature-canvas" onMouseDown={start} onMouseMove={draw} onMouseUp={end} onMouseLeave={end} onTouchStart={start} onTouchMove={draw} onTouchEnd={end}></canvas>
                                    {formik.touched.signature && formik.errors.signature ? <small style={{ color: 'red', fontSize: '.8rem' }}>{formik.errors.signature}</small> : ''}

                                    <button type="button" onClick={clearBoard} className="clear-btn">
                                        Clear
                                    </button>
                                </div>

                                <div className="submit-cont">
                                    <button type="button" onClick={formik.handleSubmit} className="submit-btn">Submit Application</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
