import Image from "next/image";
import icon from "../components/Images/logo.svg"
import styles from '../styles/doctor.module.css'
import { Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function Doctor() {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [doctorPassword, setDoctorPassword] = useState("")

    const handleSubmit = () => {
        console.log(username, password, doctorPassword)
    }

    return (
        <div>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                background: "#aee571"
            }}>
                <div className={styles.logo}>
                    MediChain
                    <Image src={icon} width={100} height={100} />
                </div>
                {/* <button className={styles.signout} onClick={logout}>Sign Out</button> */}
            </div>
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="doctorPassword"
                    label="Doctor Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{
                        width: "40%"
                    }}
                    value={doctorPassword}
                    onChange={(e) => {
                        setDoctorPassword(e.target.value)
                    }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        width: "10%",
                        marginTop: "30px"
                    }}
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </Box>
        </div>
    )
}