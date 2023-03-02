import React from 'react'
import "../styles/loginStyles.css"
import { useNavigate } from 'react-router-dom'


export default function LoginForm() {
    
    const navigate = useNavigate()

    const [credentials, setcredentials] = React.useState({
        email: "",
        password: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            })
        })
        const json = await response.json()
        console.log(json)

        // if (!json.success) {
        //     alert("Enter valid Credentials")
        // }
        if (json.success) {
            localStorage.setItem("useremail" , credentials.email)
            localStorage.setItem("authToken" , json.authToken)
            console.log(localStorage.getItem("authToken"))
            navigate("/")
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='boxer'>
            <form className="container" onClick={handleSubmit}>
                <div className="carddd">
                    <div className="singup">Login</div>
                    <div className="inputBox1">
                        <input
                            type="text"
                            required="required"
                            name='email'
                            value={credentials.email}
                            onChange={onChange}
                        />
                        <span className="user">Email</span>
                    </div>

                    <div className="inputBox">
                        <input
                            type="password"
                            required="required"
                            name='password'
                            value={credentials.password}
                            onChange={onChange}
                        />
                        <span>Password</span>
                    </div>

                    <button className="enter" type="submit">Login</button>

                </div>
            </form>
        </div>
    )
}