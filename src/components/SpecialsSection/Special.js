
function Special(props) {
    const {
        name,
        price,
        description,
        image
    } = props;

    const style = {
        backgroundImage: `url('${image}')`
    };
    return (
        <div className="card">
            <div className="mainimage-mask">
                <div className="mainimage" style={style}></div>
            </div>
            <div className="card-content">
                <div className="headline">
                    <span className="name">{name}</span>
                    <span className="price">{price}</span>
                </div>
                <p>{description}</p>
                <a href="/" className="order">
                    Order Delivery
                </a>
            </div>
        </div>
    )
}

export default Special;