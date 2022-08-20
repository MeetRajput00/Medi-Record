import Link from 'next/link';
export default function upRet(){
    return(
        <div>
            <Link href='/Homes'>
                <a>
                    <button>Upload Data</button>
                </a>
            </Link>
            <Link href='/retrieveData'>
                <a>
                    <button>Retrieve Data</button>
                </a>
            </Link>
        </div>
    )
}