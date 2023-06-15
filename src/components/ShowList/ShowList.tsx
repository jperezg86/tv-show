import React from "react";
import { Show } from "../../types/show";
import ShowListItem from "./ShowListItem";

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
        <ShowListItem key={`${new Date().getMilliseconds()}-${show?.id}`} show={show} onClick={onItemClicked} />
      ))}
    </ul>
  );
};

export default React.memo(ShowList);
