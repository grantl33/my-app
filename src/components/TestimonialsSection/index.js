import './styles.css';
import reviewerPic1 from '../../assets/users/11.jpg';
import reviewerPic2 from '../../assets/users/36.jpg';
import reviewerPic3 from '../../assets/users/62.jpg';
import reviewerPic4 from '../../assets/users/70.jpg';

import image1 from '../../assets/bruschetta_lg.jpg'
import image2 from '../../assets/pasta_lg.jpg'
import image3 from '../../assets/salad_lg.jpg'
import image4 from '../../assets/tapas_lg.jpg'

import Testimonial from './Testimonial';

const data = [
    {
        ratingId: 1,
        rating: 4,
        reviewerName: 'Sharon',
        reviewerPic: reviewerPic1,
        reviewerComments: 'Fast and friendly service!',
        image: image1
    },
    {
        ratingId: 2,
        rating: 4,
        reviewerName: 'Monica',
        reviewerPic: reviewerPic2,
        reviewerComments: 'This is my new go-to spot for lunch!',
        image: image2
    },
    {
        ratingId: 3,
        rating: 5,
        reviewerName: 'Braden',
        reviewerPic: reviewerPic3,
        reviewerComments: 'Love the fresh pizzas and salad!',
        image: image3
    },
    {
        ratingId: 4,
        rating: 5,
        reviewerName: 'Alison',
        reviewerPic: reviewerPic4,
        reviewerComments: 'Everything was delicious!',
        image: image4
    },
]

function TestimonialsSection() {
    return (
        <section className="testimonials">
            <div className="content">
                <div className="sectiontitle">
                    <span className="name">Testimonials</span>
                    <span className="action"></span>
                </div>
                <div className="row">
                    {data.map((item) => <Testimonial key={item.ratingId} {...item} />)}
                </div>
            </div>
        </section>
    );
}

export default TestimonialsSection;