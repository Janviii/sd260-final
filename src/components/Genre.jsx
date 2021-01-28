import React from 'react';
import Movie from '../components/Movie';

export default function Genre(props) {
    if (props.movies.length > 0) {
        return (
            <div className="titleList">
                <div className="title">
                    <h1>{props.genre}</h1>
                    <div className="titles-wrapper">
                        {props.movies.map((movie) => (
                                <Movie 
                                    movie={movie}
                                    key={movie.id}
                                    movieList={movie.my_list}
                                    myMovieList={props.myMovieList}
                                />
                        ))}
                    </div>
                </div>
            </div>
        );
    } else {
        return "";
    }
}