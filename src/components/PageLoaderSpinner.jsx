
const PageLoaderSpinner = ({ left }) => {
    return (
        <div className="loader-container" style={{ left: `${left}%` }}>
            <span className="loader">
            </span></div>
    )
}

export default PageLoaderSpinner;