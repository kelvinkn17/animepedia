import LoadingSpinner from "../components/elements/LoadingSpinner"

const LoadingPage = () => {
    return(
        <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <LoadingSpinner />
        </div>
    )
}

export default LoadingPage;