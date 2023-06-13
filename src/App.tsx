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
          <>
            <ShowList items={data} onItemClicked={onItemClicked} isLoading={isLoading}/>
            {
              !isLoading &&
              <button onClick={loadMore}>Load More data</button> 
            }
          </>
      )}
    </div>
  );
}

export default App;
