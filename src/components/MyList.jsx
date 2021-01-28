import React from 'react';
import Header from './components/Header';

export default function MyList(props) {
    return (
        <React.Fragment>
            <Header />
            <div className="movie">
                <img src={props.movie.poster_path} alt="Movie Poster" />
                <div className="overlay">
                    <div className="title">{props.movie.title}</div>
                    <div className="rating">{props.movie.vote_average}/10</div>
                    <div className="plot">{props.movie.overview}</div>
                    <div
                    data-toggled={props.movieList}
                    className="listToggle"
                    onClick={() => props.myMovieList(props)}>
                        <div>
                            <i className="fa fa-fw fa-plus"></i>
                            <i className="fa fa-fw fa-check"></i>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}