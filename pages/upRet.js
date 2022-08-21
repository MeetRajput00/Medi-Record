import Link from 'next/link';
import styles from '../styles/upRet.module.css';
export default function upRet(){
    return(
        <div className={styles.container}>
        
                <a href='/Homes'>
                    <button>Upload Data</button>
                </a>
            
            <Link href='/retrieveData'>
                <a>
                    <button>Retrieve Data</button>
                </a>
            </Link>
        </div>
    )
}