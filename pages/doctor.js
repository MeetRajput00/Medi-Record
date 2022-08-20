import Image from "next/image";
import icon from "../pages/Images/logo.svg"
import styles from '../styles/doctor.module.css'
import { Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import Link from 'next/link';

export default function Doctor(props) {
    const [username, setUsername] = useState(props.username)
    const [password, setPassword] = useState("")
    const [doctorPassword, setDoctorPassword] = useState("")

    const handleSubmit = () => {
        console.log(username, password, doctorPassword)
    }

    return (
        <div>
            <div className={styles.titleDoctor}>
                Doctor Login
            </div>
            <Box component="form" noValidate sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    sx={{
                        width: "40%"
                    }}
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    readOnly={true}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{
                        width: "40%"
                    }}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <Link href="/userAuth">
                    <a>
                        <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            width: "10%",
                            marginTop: "30px"
                        }}
                    >
                        Login
                    </Button>
                    </a>
                </Link>
            </Box>
        </div>
    )
}