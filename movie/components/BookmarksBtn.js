import Link from 'next/link';
import React from 'react';
import { getBookmarkByUser } from '../utils/movieUtils.js';

const STATUS = {
  WANNA: 'WANNA',
  WATCHED: 'WATCHED',
};

const BASE_URL = 'http://localhost:5000/api/bookmark';

function includeMovie(list, id) {
  for(const item of list) {
    if(item.movie_id === id) {
      return true;
    }
  }
  return false;
}

const BookmarksBtn = ({isLogin, bookmarks, setBookmarks, movie}) => {
  const wanna = bookmarks.filter(item => item.status === STATUS.WANNA);
  const watched = bookmarks.filter(item => item.status === STATUS.WATCHED);
  const isWanna = includeMovie(wanna, movie.movie_id);
  const isWatched = includeMovie(watched, movie.movie_id);

  const handleWannaClick = async () => {
    const userName = JSON.parse(localStorage.getItem('userName'));
    console.log(userName);
    if(!isWanna && !isWatched) {
      await fetch(`${BASE_URL}/${userName}/${movie.movie_id}/${STATUS.WANNA}`, {
        method: 'POST'
      }) 
    } else if(!isWanna && isWatched) {
      await fetch(`${BASE_URL}/${userName}/${movie.movie_id}/${STATUS.WANNA}`, {
        method: 'PUT'
      })
    } else if(isWanna && !isWatched) {
      await fetch(`${BASE_URL}/${userName}/${movie.movie_id}`, {
          method: 'DELETE'
        })
      }
    setBookmarks(await getBookmarkByUser(userName));
  };

  const handleWatchedClick = async () => {
    const userName = localStorage.getItem('userName');
    if (!isWanna && !isWatched) {
      await fetch(
        `${BASE_URL}/${userName}/${movie.movie_id}/${STATUS.WATCHED}`,
        { method: 'POST' }
      );
    } else if (isWanna && !isWatched) {
      // update status
      await fetch(
        `${BASE_URL}/${userName}/${movie.movie_id}/${STATUS.WATCHED}`,
        { method: 'PUT' }
      );
    } else if (!isWanna && isWatched) {
      // delete bookmark
      await fetch(
        `${BASE_URL}/${userName}/${movie.movie_id}`,
        { method: 'DELETE' }
      );
    }
    setBookmarks(await getBookmarkByUser(userName));
  }
  
  return (
    <>
      {isLogin
        ? <div className=' flex gap-3 '>
          <button onClick={handleWannaClick} className={` ${isWanna? 'bg-slate-400 ' : ''} bg-cyan-700 text-white rounded-md px-3 py-2`} >
            wanna
          </button>
          <button onClick={handleWatchedClick}  className={`bg-cyan-700 text-white rounded-md px-3 py-2 ${isWatched? 'bg-slate-400 ' : ''} `}>
            watched
          </button>
        </div>
        : <div className=' flex gap-3 '>
            <Link href='/login' className=' bg-cyan-700 text-white rounded-md px-3 py-2' >
              wanna
            </Link>
            <Link href='/login' className='  bg-cyan-700 text-white rounded-md px-3 py-2'>
              watched
            </Link>
          </div>
      }
    </>
  )
}

export default BookmarksBtn;
