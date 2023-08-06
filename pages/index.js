import Login from "./Login";
import { useMoralis } from "react-moralis";
import Form from "./Homes";
import icon from "./Images/logo.svg"
import Image from "next/image";
import styles from "../styles/index.module.css";
import Doctor from "../pages/Doctor";
export default function Home() {
  const { isAuthenticated, logout, user } = useMoralis();
  return (
    <div>
      {isAuthenticated ?
        <div>
          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            background: "#76b852", /* fallback for old browsers */
            background: "rgb(141,194,111)",
            background: "linear-gradient(90deg, rgba(141,194,111,1) 0%, rgba(118,184,82,1) 50%)"
          }}>
            <div className={styles.logo}>
              MediDoc
            </div>
            <button className={styles.signout} onClick={logout}>Sign Out</button>
          </div>
          <Doctor username={user.get("username")} />
        </div>
        : (
          <Login />
        )}
    </div>
  );
}