import { CloseButton, ModalContent, ModalWrapper } from "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <ModalWrapper isOpen={isOpen} onClick={onClose}>
      {isOpen && (
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          {children}
        </ModalContent>
      )}
    </ModalWrapper>
  );
};

