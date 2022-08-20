import styles from "../styles/Login.module.css";
import Image from "next/image";
import icon from "./Images/logo.svg";
import { useMoralis } from "react-moralis";
import Link from 'next/link';
function Login() {
  const { authenticate, authError } = useMoralis();
  return (
    <div className={styles.login_container}>
      <div className={styles.login_card}>
        <div className={styles.title}>MediDoc</div>
        <Image src={icon} width={200} height={150} />
        <div className={styles.sign_in_container}>
          {authError && (
            <p className={styles.error}>
              {authError.name}
              {authError.message}
            </p>
          )}
            <button
            onClick={authenticate}
          >
            Login with MetaMask
          </button>
                    
        </div>
      </div>
    </div>
  );
}

export default Login;