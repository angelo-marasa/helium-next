import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'

const singleHotspot = () => {
    const router = useRouter()
    const { address } = router.query

    return (
        <>
        <p className="cursor-pointer" onClick={() => router.back()}><FontAwesomeIcon icon={faAngleDoubleLeft} /> Back</p>
        <h1 className="text-3xl font-bold">
            Address: { address }
        </h1>
        </>
    )
}

export default singleHotspot
