import React, { SyntheticEvent } from "react";
import { ConnectedProps, connect } from "react-redux";
import { Show } from "../../types/show";
import { HeartIcon } from "@heroicons/react/24/solid";
import store, { RootState } from "../../store";
import { toggleFavorite } from "../../features/favorites/slice";

const mapDispatchToProps = (dispatch: typeof store.dispatch) => {
  return {
    toggleFavorite: (show: Show) => dispatch(toggleFavorite(show)),
  };
};

const mapStateToProps = (state: RootState, { show }: any) => {
  return {
    isInFavorite: state?.favorites?.favorites?.find(
      (item) => item?.id === show?.id
    ),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ShowListItemProps = ConnectedProps<typeof connector> & {
  show: Show;
  onClick: (show: Show) => void;
};

const ShowListItem = ({
  show,
  isInFavorite,
  onClick,
  toggleFavorite,
}: ShowListItemProps) => {
  const listItemClick = React.useCallback(() => {
    onClick(show);
  }, [onClick, show]);

  const heartClicked = React.useCallback(
    (evt: SyntheticEvent) => {
      toggleFavorite(show);
      evt?.stopPropagation();
    },
    [show, toggleFavorite]
  );

  return (
    <li
      onClick={listItemClick}
      className="cursor-pointer border p-5 flex flex-row justify-between hover:bg-gray-100"
    >
      <div className="flex flex-row items-center">
        <img src={show?.image?.medium} alt="poster" className="rounded content-center w-20"/>
        <span className="p-3 font-semibold text-pink-900 text-xl">{show?.name}</span>
      </div>
      <HeartIcon
        height={25}
        onClick={heartClicked}
        className={isInFavorite ? "text-pink-700" : "text-gray-600"}
      />
    </li>
  );
};

export default React.memo(connector(ShowListItem))
