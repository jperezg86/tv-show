import Favorites from "./Favorites";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store";

const mapStateToProps = (state: RootState) => ({
    favorites: state?.favorites?.favorites
})

const connector = connect(mapStateToProps)

export type FavoritesPropsFromRedux = ConnectedProps<typeof connector>
export default connector(Favorites)