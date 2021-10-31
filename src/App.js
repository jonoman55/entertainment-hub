import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';
import BottomNavigation from './components/MainNav/MainNav';
import { Container } from '@material-ui/core';
import './App.css';

const App = () => (
    <Router>
        <Header />
        <div className="app">
            <Container>
                <Switch>
                    <Route path="/" component={Trending} exact />
                    <Route path="/movies" component={Movies} />
                    <Route path="/series" component={Series} />
                    <Route path="/search" component={Search} />
                </Switch>
            </Container>
        </div>
        <BottomNavigation />
    </Router>
);

export default App;