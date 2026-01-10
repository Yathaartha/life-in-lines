import {
  CloseButton,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalWrapper,
} from "./Modal.css";
import closeIcon from "../../assets/icons/close-x-icon.svg";

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
              <img src={closeIcon} alt="Close" width={"30px"} />
            </CloseButton>
          </ModalHeader>
          {children}
        </ModalContent>
      )}
    </ModalWrapper>
  );
};

