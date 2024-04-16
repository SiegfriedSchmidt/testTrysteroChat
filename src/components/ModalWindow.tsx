import React, {FC, ReactNode} from 'react';
import styled from "styled-components";

const StyledModalDiv = styled.div<{ $show: boolean }>`
    z-index: 5;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${props => props.$show ? 1 : 0};
    pointer-events: ${props => props.$show ? "all" : "none"};;
    transition: 0.5s;
`

const StyledModalContentDiv = styled.div<{ $show: boolean }>`
    padding: 20px;
    border-radius: 12px;
    background-color: white;
    transform: ${props => props.$show ? "scale(1)" : "scale(0.5)"};
    transition: 0.4s all;
    width: 50vw;
`

interface ModalWindowProps {
  show: boolean
  setShow: (show: boolean) => void
  children?: ReactNode
}

const ModalWindow: FC<ModalWindowProps> = ({show, setShow, children}) => {
  return (
    <StyledModalDiv $show={show} onClick={() => setShow(false)}>
      <StyledModalContentDiv $show={show} onClick={e => e.stopPropagation()}>
        {children}
      </StyledModalContentDiv>
    </StyledModalDiv>
  );
};

export default ModalWindow;