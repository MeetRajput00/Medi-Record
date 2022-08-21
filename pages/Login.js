import styles from "../styles/Login.module.css";
import Image from "next/image";
import icon from "../pages/Images/heart.png";
import { useMoralis } from "react-moralis";
import Link from 'next/link';
function Login() {
  const { authenticate, authError } = useMoralis();
  return (
    <div className={styles.login_container}>
      <div className={styles.login_card}>
        <div className={styles.title}>MediDoc</div>
        <Image src={icon} width={130} height={140} />
        <div className={styles.sign_in_container}>
          {authError && (
            <p className={styles.error}>
              {authError.name}
              {authError.message}
            </p>
          )}
            <button
            className={styles.loginButton}
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