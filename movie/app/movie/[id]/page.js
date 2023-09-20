'use client'
import MovieInfo from '@/components/MovieInfo';
import React, { useEffect, useState } from 'react';
import { getScore, getBookmarkByUser } from '@/utils/movieUtils.js';
import BookmarksBtn from '@/components/BookmarksBtn';
import YourScore from '@/components/YourScore';

const BASE_URL = 'http://localhost:5000/api/movie';

const page = ({params}) => {
  const { id } = params;
  const [movie, setMovie] = useState({});
  const [score, setScore] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const getData= async () => {    
      if(userName) {
        const res = await getBookmarkByUser(userName);
        console.log(res);
        setLogin(true);
        setBookmarks(res);
      };
    }
    getData();
  }, [])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${BASE_URL}/${id}`);
      const json = await res.json();
      setMovie(json[0]);
      setScore(await getScore(id));
    };
    getData();
  }, [id]);

  return (
    <>
      {movie?.length === 0
       ? <div>loading...</div>
       : <div className=' flex flex-col gap-3 p-3 xl:w-4/6 mx-auto'>
        <MovieInfo movie={movie} score={score} setScore={setScore} />
        <div >
          <BookmarksBtn
            isLogin={isLogin}
            movie={movie}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}          
           />
          <YourScore />
        </div>
        <p className=' text-cyan-700 text-lg'>Introduction · · · · · ·</p>
        <div className=' indent-8'>{movie?.intro}</div>
        <p className=' text-cyan-700 text-lg'>Comments · · · · · ·</p>
      </div>}
    </>
  )
}

export async function generateStaticParams() {
  const result = await fetch(`${BASE_URL}/ids`);
  const json = await result.json();
  console.log(result);
  return json.map(item => ({
    id: item.movie_id,
  }));
}
 
export default page;
