import React from 'react';

export default function Movie(props) {
    return (
        <div className="movie">
            <img src={props.movie.poster_path} alt="Movie Poster" />
            <div className="overlay">
                <div className="title">{props.movie.title}</div>
                <div className="rating">{props.movie.vote_average}/10</div>
                <div className="plot">{props.movie.overview}</div>
                <div 
                className="listToggle" 
                data-toggled={props.movieList}
                onClick={() => props.myMovieList(props)}>
                    <div>
                        <i className="fa fa-fw fa-plus"></i>
                        <i className="fa fa-fw fa-check"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}