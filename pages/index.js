import Login from "../pages/Login";
import { useMoralis } from "react-moralis";
import Form from "../pages/Homes";
import icon from "../pages/Images/logo.svg"
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
            background: "#aee571"
          }}>
            <div className={styles.logo}>
              MediDoc
              <Image src={icon} width={100} height={100} />
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