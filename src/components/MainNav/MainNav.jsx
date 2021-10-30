import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, BottomNavigationAction, BottomNavigation } from "@material-ui/core";
import { Tv, Movie, Search, Whatshot } from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#2d313a",
        zIndex: 100,
    },
});

export default function MainNav() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const history = useHistory();

    useEffect(() => {
        if (value === 0) {
            history.push("/");
        } else if (value === 1) {
            history.push("/movies");
        } else if (value === 2) {
            history.push("/series");
        } else if (value === 3) {
            history.push("/search");
        }
    }, [value, history]);

    return (
        <BottomNavigation
            className={classes.root}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
        >
            <BottomNavigationAction
                style={{ color: "white" }}
                label="Trending"
                icon={<Whatshot />}
            />
            <BottomNavigationAction
                style={{ color: "white" }}
                label="Movies"
                icon={<Movie />}
            />
            <BottomNavigationAction
                style={{ color: "white" }}
                label="TV Series"
                icon={<Tv />}
            />
            <BottomNavigationAction
                style={{ color: "white" }}
                label="Search"
                icon={<Search />}
            />
        </BottomNavigation>
    );
}