import Login from "../components/Login";
import { useMoralis } from "react-moralis";
import Form from "../components/Homes";
import icon from "../components/Images/logo.svg"
import Image from "next/image";
import styles from "../styles/index.module.css";
export default function Home() {
  const { isAuthenticated, logout } = useMoralis();
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
              MediChain 
              <Image src={icon} width={100} height={100} />
            </div>
            <button className={styles.signout} onClick={logout}>Sign Out</button>
          </div>
          <Form />
        </div>
        : (
          <Login />
        )}
    </div>
  );
}