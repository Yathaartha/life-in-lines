import styled from "styled-components";

export const EventModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 4px 8px var(--shadow);
  background-color: var(--modal-bg);
  color: var(--text-color);
`;

export const EventModalHeader = styled.h2`
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  width: 100%;
  padding: 10px 1rem;
  color: var(--text-color);
`;

export const EventContent = styled.p`
  /* margin-top: 0.5rem; */
  padding: 10px;
  color: var(--text-color);
`;

export const EventTitle = styled.h3`
  margin: 0;
  color: var(--text-color);
`;

export const EventFooter = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.5rem;
`;

