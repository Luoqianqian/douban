import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Rating } from '@mui/material';

function MovieInfo({ movie, score }) {
  return (
    <div className='mb-5'>
      <div className=' flex text-2xl '>
        <h1 className=''>{movie?.movie_title}</h1>
        <h1 className=' text-gray-500'>{movie?.release_date}</h1>
      </div>
      <div className=' flex gap-5 mt-3 '>
        <Image
          src={movie?.img_url}
          width={136}
          height={200}
          alt='Cover'
        />
        <div className=' flex flex-3 flex-col gap-1.5 overflow-hidden' >
          <div>
            <span>Director: </span>
            <span className=' text-cyan-700'>{movie?.directedBy}</span>
          </div>
          <div className=' flex'>
            <span>Starring: </span>
            <span className=' truncate text-cyan-700' >{movie?.starring}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie?.genre}</span>
          </div>
          <div>
            <span>Country: </span>
            <span>{movie?.country}</span>
          </div>
          <div>
            <span>Language: </span>
            <span >{movie?.language}</span>
          </div>
          <div>
            <span>Runtime: </span>
            <span>{movie?.runtime}</span>
          </div>
          <div>
            <span>ID: </span>
            <span>{movie?.movie_id}</span>
          </div>
        </div>
        <div>
          <h5 className=' text-gray-400'>Score</h5>
          <div>
            <div>{score}</div>
            <Rating
              value={score}
              size='medium'
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
