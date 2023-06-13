import React from "react";
import { Show } from "../types/show";

const ShowListItem = ({
  show,
  onClick,
}: {
  show: Show;
  onClick: (show: Show) => void;
}) => {
  const listItemClick = React.useCallback(() => {
    onClick(show);
  }, [onClick, show]);

  return <li onClick={listItemClick} className="">{show?.name}</li>;
};

type ListProps = {
  items: Show[] | undefined;
  isLoading: boolean;
  onItemClicked: (show: Show) => void;
};

const ShowList = ({ items, isLoading, onItemClicked }: ListProps) => {
  if (isLoading) {
    return <span> Loading ...</span>;
  }
  if (!items) {
    return <span>No data to display</span>;
  }

  return (
    <ul>
      {items?.map((show) => (
        <ShowListItem key={show?.id} show={show} onClick={onItemClicked} />
      ))}
    </ul>
  );
};

export default ShowList;
