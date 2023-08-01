import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password1 === password2) {
            try {
                await firebase.signUpUserWithEmailAndPassword(email, password1)
                // alert('Registration successful')
            } catch (error) {
                console.log(error);
            }
        } else {
            alert('Password & Confirm Password do not match!')
        }
    }

    useEffect(() => {
        firebase.user && navigate('/')
    }, [firebase])

    return (
        <div className='container'>
            <h1 className='mt-4 mb-5'>Register here</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} autoComplete='on' id="email" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password1} onChange={e => setPassword1(e.target.value)} autoComplete='on' id="password1" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={password2} onChange={e => setPassword2(e.target.value)} autoComplete='on' id="password2" required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}
