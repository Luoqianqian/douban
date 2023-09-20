'use client'

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import { getBookmarkByUser } from '../utils/movieUtils.js';
import { Pagination } from '@mui/material';


const BASE_URL = 'http://localhost:5000/api/movie';
const LIMIT = 6;

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [movies, setMovies] = useState([]);
  const [isLogin, setLogin] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const path = usePathname();
  const searchParams =  useSearchParams();
  const router = useRouter();

  const getMoviesData = useCallback(async () => {
    const response = await fetch(`${BASE_URL}?page=${page}&limit=${LIMIT}`);
    const json = await response.json();
    setMovies(json);
  }, [searchParams]);

  const getPageCount = async () => {
    const response = await fetch(`${BASE_URL}/count`);
    const json = await response.json();
    return json;
  }

  const handlePageChange = (e, pageNum) => {
    router.push(`/${path}?page=${pageNum}`);
  };
  
  useEffect(() => {
    (async () => {
      const userName = localStorage.getItem('userName');
      if(userName) {
        setBookmarks(await getBookmarkByUser(userName));
      }
      const res= await getPageCount();
      setPageCount(res);
    })()
  }, [])

  useEffect(() => {
    setLogin(localStorage.getItem('userName'));
  }, [path]);

  useEffect(() => {
    const num = Number.parseInt(searchParams.get('page')) || 1;
    getMoviesData(num);
    setPage(num);
  }, [searchParams]);

  return (
    <main className=" xl:w-4/6 mx-auto p-3">
      {movies.length === 0
      ? <div>loading...</div>
      : movies.map((movie) => (
          <MovieCard
            key={movie.movieId}
            movie={movie}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
            isLogin={isLogin}
          />
      ))}
      <div className=' my-5'>
        <Pagination 
          count={pageCount} 
          page={page} 
          variant="outlined" 
          shape="rounded" 
          onChange={handlePageChange}
        />
      </div>
    </main>
  )
}
