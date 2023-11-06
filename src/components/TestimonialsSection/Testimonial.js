import starfill from '../../assets/star-fill.svg';
import star from '../../assets/star.svg';

function Testimonial(props) {
    const {
        rating,
        image,
        reviewerPic,
        reviewerName,
        reviewerComments
    } = props;

    const imageStyle = {
        backgroundImage: `url('${image}')`
    }
    const reviewerPicStyle = {
        backgroundImage: `url('${reviewerPic}')`
    }

    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(<img key={i} src={(i < rating) ? starfill : star} alt="" />);
    }

    return (
        <div className="card">
            <div className="testimonial-image" style={imageStyle}></div>
            <div className="reviewer-pic" style={reviewerPicStyle}></div>
            <div className="content">
                <span className="reviewer">{reviewerName}</span>
                <p>“{reviewerComments}”</p>
                <span className="stars">{stars} ({rating})</span>
            </div>
        </div>
    )
}

export default Testimonial;