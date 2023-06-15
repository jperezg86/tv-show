import React, { useCallback, useState } from "react";
import "./App.css";
import { useFilterShowsQuery, useGetShowsQuery } from "./services/shows";
import ShowList from "./components/ShowList/ShowList";
import { Show } from "./types/show";
import ShowDetailModal from "./components/ShowDetailModal/ShowDetailModal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Toggle from "./components/Toggle/Toggle";
import store, { RootState } from "./store";
import { ConnectedProps, connect } from "react-redux";
import { toggleFavorite } from "./features/favorites/slice";

const mapStateToProps = (state: RootState) => {
  return {
    favorites: state?.favorites?.favorites,
  };
};

const mapDispatchToProps = (dispatch: typeof store.dispatch) => {
  return {
    toggleFavorite: (show: Show) => dispatch(toggleFavorite(show)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps)

type AppProps = ConnectedProps<typeof connector>

function App({
  favorites,
  toggleFavorite,
}: AppProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [filterBy, setFilterBy] = useState("");
  const [isShowingFavorites, setIsShowingFavorites] = useState(false);
  const [selectedShow, setSelectedShow] = useState<Show>();
  const { data, isLoading } = useGetShowsQuery(currentPage);
  const { data: filteredData, isLoading: isLoadingFiltered } =
    useFilterShowsQuery(filterBy, {
      skip: !filterBy,
    });

  const loadMore = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  const onItemClicked = useCallback((show: Show) => {
    setSelectedShow(show);
  }, []);

  const showListItems = React.useMemo(() => {
    if (isShowingFavorites) {
      return favorites;
    }

    if (filterBy) {
      return filteredData;
    }

    return data;
  }, [data, favorites, filterBy, filteredData, isShowingFavorites]);

  const toggleFavoriteAndCloseModal = useCallback(
    (show: Show) => {
      toggleFavorite?.(show);
      setIsShowingFavorites(false);
    },
    [toggleFavorite]
  );

  return (
    <article className="flex flex-col h-screen overflow-hidden">
      <header className="bg-black p-6 text-white flex justify-center">
        <h1 className="text-3xl font-extrabold">My TV Shows</h1>
      </header>

      <section className="flex-auto overflow-y-scroll p-6">
        <div className="flex justify-end p-6">
          <Toggle
            label={"Favorites only"}
            checked={isShowingFavorites}
            onClick={(evt) => setIsShowingFavorites(evt?.target?.checked)}
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon width={25} />
          </div>
          <input
            type="text"
            value={filterBy}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(evt) => {
              setFilterBy(evt?.target?.value);
            }}
            placeholder="Filter shows"
          />
        </div>
        <ShowList
          items={showListItems}
          onItemClicked={onItemClicked}
          isLoading={isLoading || isLoadingFiltered}
        />
        {!isShowingFavorites && !filterBy && (
          <div className="p-6 flex items-center justify-center">
            <button
              onClick={loadMore}
              className="rounded-lg bg-pink-700 px-10 py-4 text-white"
            >
              Load More data
            </button>
          </div>
        )}
        <ShowDetailModal
          show={selectedShow}
          visible={Boolean(selectedShow)}
          onAccept={toggleFavoriteAndCloseModal}
          onClose={() => setSelectedShow(undefined)}
        />
      </section>

      <footer className="bg-black text-white flex justify-center p-6">
        <span>
          Copyright Jose Manuel Pérez González 2023, All Rights Reserved
        </span>
      </footer>
    </article>
  );
}

export default connector(App)

