import React, { useCallback, useState } from 'react';
import './App.css';
import { useGetShowsQuery } from './services/shows';

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const {data, error, isLoading} = useGetShowsQuery(currentPage)

  const loadMore = useCallback(() => {
    setCurrentPage(currentPage+1)
  }, [currentPage])

  return (
    <div>
      <ul>
        {
          data?.map(item => (
            <li key={item?.id}>{item?.name}</li>
          ))
        }
      </ul>
      <button onClick={loadMore}>Load More data</button>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
