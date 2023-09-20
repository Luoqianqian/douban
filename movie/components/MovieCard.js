'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Rating } from '@mui/material';
import BookmarksBtn from './BookmarksBtn';
import { getScore } from '@/utils/movieUtils.js';

const MovieCard = ({movie, isLogin, bookmarks, setBookmarks}) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    (async() => setScore(await getScore(movie.movie_id)))()
  }, [movie]);

  return (
    <div className=' flex flex-row gap-5 my-3 border-t-2 border-dotted p-2'>
      <Link href={`/movie/${movie.movie_id}`}>
        <Image src={movie.img_url} alt={movie.movie_title} width={100} height={150} />
      </Link>
      <div className=' flex flex-col gap-2 w-10/12'>
        <Link href={`/movie/${movie.movie_id}`}>
          <h1 className=' hover:text-cyan-700'>{movie.movie_title}</h1>
        </Link>
        <p className=' truncate '>
          {`Director: ${movie.director} / Starring: ${movie.starring}`}
        </p>
        <p>
          {`${movie.release_date} / ${movie.country} / ${movie.genre}`}
        </p>
        <div className=' flex items-center gap-1 text-yellow-400'>
          <Rating
            name="read-only"
            value={score}
            readOnly
          />
          <span>{score}</span>
        </div>
        <p className=' truncate'>{movie.abstract}</p>
        <BookmarksBtn
          movie={movie}
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
          isLogin={isLogin}
        />
      </div>
    </div>
  )
}

export default MovieCard;