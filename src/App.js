import React, { Component } from 'react';
import * as MovieAPI from './lib/MovieAPI';
import Header from './components/Header';
import Genre from './components/Genre';
import Movie from './components/Movie';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  state = {
    movies: [],
    genres: [],
    query: "",
  };

  componentDidMount = () => {
    MovieAPI.getAll()
    .then((movies) => {
      this.setState({ movies });
    });

    MovieAPI.genres()
    .then((genres) => {
      const sortedGenres = genres.sort(function (a, b) {
        let genreA = a.name.toLowerCase();
        let genreB = b.name.toLowerCase();
        return genreA < genreB ? -1 : genreA > genreB ? 1 : 0;
      });
      this.setState({ genres: sortedGenres });
    });
  }  

  amendSearchField = (e) => {
    this.setState({ query: e.target.value }, () => {
      this.searchResults(this.state.query);
    });
  };

  searchResults = (q) => {
    const searchList = this.state.movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(q.toLowerCase()) ||
        movie.overview.toLowerCase().includes(q.toLowerCase())
    );
    if (q !== "") {
      this.setState({ movies: searchList });
    } else {
      MovieAPI.getAll().then((movies) => {
        this.setState({ movies });
      });
    }
  };

  myMovieList = (props) => {
    if (props.movie.my_list) {
      MovieAPI.removeFromList(props.movie);
    } else {
      MovieAPI.addToList(props.movie);
    }
    MovieAPI.getAll().then((movies) => {
      this.setState({ movies });
    });
  };

  render = () => {
    const myList = this.state.movies.filter((movie) => movie.my_list === true);
    return (
      <React.Fragment>
        <Route>
          <Header 
            amendSearchField={this.amendSearchField}
            value={this.state.query}
            results={this.state.movies.length}
          />
          <Switch>
            <Route exact path="/">
              {this.state.genres.map((genre) => (
                <Genre 
                  genre={genre.name}
                  key={genre.id}
                  movies={this.state.movies.filter((movie) =>
                    movie.genre_ids.includes(genre.id)
                  )}
                  myMovieList={this.myMovieList}
                />
              ))}
            </Route>
          
            <Route exact path="/mylist">
              <div className="titleList">
                <div className="title">
                  <h1>My List</h1>
                  <div className="titles-wrapper">
                    {myList.map((movie) => (
                      <Movie
                        movie={movie}
                        key={movie.id}
                        movieList={movie.my_list}
                        myMovieList={this.myMovieList}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Route>
          </Switch>
        </Route>
      </React.Fragment>
    )
  };
}

export default App;
