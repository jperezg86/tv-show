import React, { useCallback, useState } from 'react';
import './App.css';
import { useGetShowsQuery } from './services/shows';
import ShowList from './components/ShowList';
import { Show } from './types/show';

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const {data, error, isLoading} = useGetShowsQuery(currentPage)

  const loadMore = useCallback(() => {
    setCurrentPage(currentPage+1)
  }, [currentPage])

  const onItemClicked = useCallback((show: Show) => {
    console.log(show)
  }, [])

  return (
    <div>
      {
        (error) ? (
          <div className="error">Error fetching shows data</div>
        ): (
          <div className="flex flex-col p-12 overflow-hidden">
            <h1 className='font-extrabold text-center text-4xl'>My TV Shows</h1>
            <div className="flex h-100 overflow-scroll">
                <ShowList items={data} onItemClicked={onItemClicked} isLoading={isLoading}/>
                {
                  !isLoading &&
                  <button onClick={loadMore}>Load More data</button> 
                }
            </div>
          </div>
      )}
    </div>
  );
}

export default App;
