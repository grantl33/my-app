import "./styles.css";

function LoadingSpinner(props) {
    const { showText } = props;
    return (
        <span className="loading" data-testid="loading-spinner" >
            <span className="spinner"></span>
            {(showText) && <>Loading…</>}
        </span>
    )
}

export default LoadingSpinner;