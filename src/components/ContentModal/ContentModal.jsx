import axios from "axios";
import { useEffect, useState } from "react";
import { makeStyles, Modal, Backdrop, Fade, Button } from "@material-ui/core";
import { img_500, unavailable, unavailableLandscape } from "../../config/config";
import { YouTube } from "@material-ui/icons";
import Carousel from "../Carousel/Carousel";
import "./ContentModal.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function TransitionsModal({ children, media_type, id }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchData = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
            );
            setContent(data);   
        } catch (error) {
            console.log(error);
        }
    };

    const fetchVideo = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
            );
            setVideo(data.results[0]?.key);   
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div
                className="media"
                style={{ cursor: "pointer" }}
                color="inherit"
                onClick={handleOpen}
            >
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    {content && (
                        <div className={classes.paper}>
                            <div className="ContentModal">
                                <img
                                    className="ContentModal__portrait"
                                    src={content.poster_path
                                            ? `${img_500}/${content.poster_path}`
                                            : unavailable}
                                    alt={content.name || content.title}
                                />
                                <img
                                    className="ContentModal__landscape"
                                    src={
                                        content.backdrop_path
                                            ? `${img_500}/${content.backdrop_path}`
                                            : unavailableLandscape
                                    }
                                    alt={content.name || content.title}
                                />
                                <div className="ContentModal__about">
                                    <span className="ContentModal__title">
                                        {content.name || content.title} ({(
                                            content.first_air_date ||
                                            content.release_date ||
                                            "-----").substring(0, 4)})
                                    </span>
                                    {content.tagline && (
                                        <i className="tagline">{content.tagline}</i>
                                    )}
                                    <span className="ContentModal__description">
                                        {content.overview}
                                    </span>
                                    <div>
                                        <Carousel id={id} media_type={media_type} />
                                    </div>
                                    <Button
                                        variant="contained"
                                        startIcon={<YouTube />}
                                        color="secondary"
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    >
                                        Watch the Trailer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </>
    );
};