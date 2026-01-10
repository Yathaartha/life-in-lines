import { CloseButton, ModalContent, ModalHeader, ModalTitle, ModalWrapper } from "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <ModalWrapper isOpen={isOpen} onClick={onClose}>
      {isOpen && (
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <CloseButton onClick={onClose}>
              {/* <img src={closeIcon} alt="Close" width={"30px"} /> */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill={`var(--text-color)`}
                />
              </svg>
            </CloseButton>
          </ModalHeader>
          {children}
        </ModalContent>
      )}
    </ModalWrapper>
  );
};

