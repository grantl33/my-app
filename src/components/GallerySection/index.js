import './styles.css';

import fish from "../../assets/fish_lg.jpg";
import bruschetta from "../../assets/bruschetta_lg.jpg";
import salad from "../../assets/salad_lg.jpg";
import pasta from "../../assets/pasta_lg.jpg";
import tapas from "../../assets/tapas_lg.jpg";
import { useRef, useState } from 'react';

const items = [
    {
        name: 'fish',
        image: fish
    },
    {
        name: 'bruschetta',
        image: bruschetta
    },
    {
        name: 'salad',
        image: salad
    },
    {
        name: 'pasta',
        image: pasta
    },
    {
        name: 'tapas',
        image: tapas
    },
]
function GallerySection() {
    const rowEl = useRef(null);
    const [position, setPosition] = useState(0);

    const handlePrevious = () => {
        setPosition(position - 1);
    }
    const handleNext = () => {
        setPosition(position + 1);
    }

    const rowStyle = {
        marginLeft: `-${position * 100}%`,
    };

    const itemCount = items.length;

    const dots = [];
    for (let i = 0; i < itemCount; i++) {
        const classNames = ["image-gallery-dot"];
        if (i === position) classNames.push("selected");
        dots.push(
            <div className={classNames.join(" ")}
                key={i}
                onClick={() => setPosition(i)}></div>
        );
    }

    return (
        <section className="gallery">
            <div className="content">
                <div className="row">
                    <div className="left">
                        <h1>Little Lemon</h1>
                        <h2>Our Story</h2>
                        <p>
                            The Little Lemon opened its doors in 2023 and has been serving
                            delicuous food ever since. We have a vibrant dining area that
                            is casual and sophisticated. A perfect venue for a meal with friends
                            or even if you're on the go. We look forward to serving you soon!
                        </p>
                    </div>
                    <div className="right">
                        <div className="image-gallery">
                            <div className="image-gallery-overlay">
                                <div className="image-gallery-left">
                                    {(position > 0 &&
                                        <div className='image-gallery-arrow' onClick={handlePrevious}></div>
                                    )}
                                </div>
                                <div className="image-gallery-center">
                                    <div className='image-gallery-dots'>{dots}</div>
                                </div>
                                <div className="image-gallery-right">
                                    {(position < itemCount - 1 &&
                                        <div className='image-gallery-arrow' onClick={handleNext}></div>
                                    )}
                                </div>
                            </div>
                            <div className="image-gallery-row" ref={rowEl} style={rowStyle}>
                                {items.map((item) =>
                                    <div key={item.name}
                                        className='image-gallery-row-item'
                                        style={{ backgroundImage: `url('${item.image}')` }}
                                    ></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GallerySection;