import classNames from "classnames"
import { ReactElement } from "react"

type GenericComponentProps = {
    title: string,
    visible: boolean,
    okButtonLabel?: string, 
    cancelButtonLabel?: string,
    onClose: () => void
    onAccept: ()=> void
    children: ReactElement
}
const GenericModal = ({
    title,
    children,
    okButtonLabel = 'ok',
    cancelButtonLabel = 'cancel',
    visible,
    onClose,
    onAccept,
} : GenericComponentProps) => {
    const overlayClassName = classNames(
      "absolute w-full h-full bg-black opacity-50 top-0 left-0 z-30 ",
      !visible && "hidden"
    );

    const modalRootClassName = classNames(
        "top-0 left-0 absolute h-full w-full flex",
        !visible && "hidden"
    )

    return (
      <>
        <div className={overlayClassName}></div>
        <div className={modalRootClassName}>
          <div
            id="defaultModal"
            tabIndex={-1}
            className="flex items-center justify-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative w-full max-w-2xl max-h-screen">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="defaultModal"
                    onClick={onClose}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
  
                {/* <!-- Modal body --> */}
                <div className="p-6 space-y-6 max-h-[500px] overflow-y-scroll">
                   {children}
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={onAccept}
                  >
                   {okButtonLabel}
                  </button>
                  <button
                    onClick={onClose}
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    {cancelButtonLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default GenericModal
