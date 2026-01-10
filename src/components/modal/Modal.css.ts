import styled from "styled-components";

export const ModalWrapper = styled.div<{
  isOpen: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--modal-overlay);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
`;

export const ModalContent = styled.div`
  background-color: var(--modal-bg);
  color: var(--text-color);
  border-radius: 10px;
  box-shadow: 0 4px 8px var(--shadow-strong);
  max-width: 500px;
  width: 100%;
  position: relative;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-color);
  &:hover {
    opacity: 0.7;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  padding: 1rem;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-color);
`;

