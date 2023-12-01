import "./styles.css";

function LoadingSpinner(props) {
    const { showText } = props;
    const text = (showText)
        ? <>Loading…</>
        : ""
    return (
        <span className="loading">
            <span className="spinner"></span>
            {text}
        </span>
    )
}

export default LoadingSpinner;