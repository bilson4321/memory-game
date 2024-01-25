import { useRef } from "react";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}
const Modal = ({ children, open, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {open && (
        <div
          ref={modalRef}
          className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center"
          onClick={(e) => modalRef.current === e.target && onClose()}
        >
          <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center">
                <h4 className="text-2xl">Your score is:</h4>
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
