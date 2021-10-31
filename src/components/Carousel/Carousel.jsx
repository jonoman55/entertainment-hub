import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { img_300, noPicture } from "../../config/config";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ id, media_type }) => {
    const [credits, setCredits] = useState([]);

    const items = credits.map((c) => (
        <div className="carouselItem">
            <img
                className="carouselItem__img"
                src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                alt={c?.name}
                onDragStart={handleDragStart}
            />
            <b className="carouselItem__txt">{c?.name}</b>
        </div>
    ));

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    };

    const fetchCredits = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
            );
            setCredits(data.cast);   
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
    }, []);

    return (
        <AliceCarousel
            mouseTracking
            infinite
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
        />
    );
};

export default Gallery;