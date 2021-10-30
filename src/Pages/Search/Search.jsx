import axios from "axios";
import { useEffect, useState } from "react";
import { makeStyles, createTheme, Button, Tab, Tabs, OutlinedInput, ThemeProvider } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import ClearIcon from "../../components/ClearIcon/ClearIcon";

const useStyles = makeStyles(({
    search: {
        display: 'flex',
        margin: '15px 0',
    },
    searchBox: {
        flex: 1,
    },
}));

const Search = () => {
    const classes = useStyles();
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
  
    const darkTheme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    });
  
    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            setContent(data.results);
            setNumOfPages(data.total_pages);
        } catch (error) {
            console.error(error);
        }
    };
  
    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);
  
    const handleClear = () => {
        setSearchText('');
        setContent([]);
        setPage(1);
        setNumOfPages(0);
    };

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div className={classes.search}>
                    <OutlinedInput
                        className={classes.searchBox}
                        type="text"
                        placeholder="Search"
                        autoComplete='off'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        endAdornment={searchText &&
                            <ClearIcon onClick={handleClear} />
                        }
                    />
                    <Button
                        onClick={fetchSearch}
                        variant="contained"
                        style={{ marginLeft: 10 }}
                    >
                        <SearchIcon fontSize="large" />
                    </Button>
                </div>
                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                    style={{ paddingBottom: 5 }}
                    aria-label="disabled tabs example"
                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>
            <div className="trending">
                {content && content.map((c) => (
                    <SingleContent
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type={type ? "tv" : "movie"}
                        vote_average={c.vote_average}
                    />
                ))}
                {searchText && !content &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    );
};
  
export default Search;