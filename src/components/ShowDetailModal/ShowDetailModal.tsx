import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store";
import { Show } from "../../types/show";
import GenericModal from "../GenericModal/GenericModal";
import { useCallback } from "react";

const mapStateToProps = (state: RootState, { show }: any) => {
    return {
      isInFavorite: state?.favorites?.favorites?.find(
        (item) => item?.id === show?.id
      ),
    };
};

const connector = connect(mapStateToProps);

type ShowDetailModalProps =  ConnectedProps<typeof connector> & {
  show: Show | undefined
  visible: boolean
  onAccept: (show: Show | undefined) => void
  onClose: () => void
};
const ShowDetailModal = ({ show, visible, isInFavorite, onAccept, onClose }: ShowDetailModalProps) => {
    const onAcceptCallback = useCallback(() => {
        onAccept(show)
    }, [onAccept, show])
    
    return <GenericModal 
        title={show?.name || ''} 
        visible={visible} 
        onClose={onClose} 
        okButtonLabel={isInFavorite ? 'Remove from favorites' : 'Add to favorites'}
        onAccept={onAcceptCallback}>
            <div>
                <img src={show?.image?.medium} className="rounded h-80 float-left mr-4" alt="poster" />
                <div dangerouslySetInnerHTML={{__html: show?.summary || ''}} />
            </div>
    </GenericModal>
}

export default connector(ShowDetailModal);
