import './styles.css';
import Special from "./Special";
import salad from '../../assets/salad_lg.jpg';
import pasta from '../../assets/pasta_lg.jpg';
import bruschetta from '../../assets/bruschetta_lg.jpg';

const specials = [
    {
        itemId: 101,
        name: "Garden Salad",
        price: "$9.95",
        description: "Fresh, crisp lettuce tossed together with raisins, sesame seeds, tomatoes, eggs, avocado, and savory furikake.",
        image: salad
    },
    {
        itemId: 102,
        name: "Garden Salad",
        price: "$9.95",
        description: "Fresh, crisp lettuce tossed together with raisins, sesame seeds, tomatoes, eggs, avocado, and savory furikake.",
        image: pasta
    },
    {
        itemId: 103,
        name: "Garden Salad",
        price: "$9.95",
        description: "Fresh, crisp lettuce tossed together with raisins, sesame seeds, tomatoes, eggs, avocado, and savory furikake.",
        image: bruschetta
    },
]
function SpecialsSection() {
    return (
        <section className="specials">
            <div className="content">
                <div className="sectiontitle">
                    <span className="name">Specials</span>
                    <span className="action">
                        <a href="/" className="actionlink">
                            Full Menu
                        </a>
                    </span>
                </div>
                <div className="row">
                    {specials.map((item) => <Special key={item.itemId} {...item} />)}
                </div>
            </div>
        </section>
    )
}

export default SpecialsSection;