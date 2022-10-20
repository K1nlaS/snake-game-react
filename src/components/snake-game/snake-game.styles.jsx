import styled from "styled-components";


export const SNAKE_CONTAINER = styled.div`

  max-width: fit-content;
  position: relative;
  margin: 0 auto;
  outline: none;
  
  canvas {
    border: 1px solid black;
    background: rgba(1, 22, 39, 0.84);
    box-shadow: inset 1px 5px 11px rgba(2, 18, 27, 0.71);
    border-radius: 8px;
  }  
`;

export const BUTTON_CONTAINER = styled.div`

  position: absolute;
  left: 0;
  right: 0;
  bottom: 20%;
  display: flex;
  justify-content: center;

  button {
    color: #01080E;
    font-weight: 600;
    font-size: 14px;
    background-color: #FEA55F;
    border: none;
    border-radius: 8px;
    padding: 10px 14px;
    
    cursor: pointer;
    transition: .3s all;

    &:hover {
      background-color: #fdb177;
    }
  }
`;

export const GAME_OVER = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20%;
  display: flex;
  justify-content: center;

  color: #43D9AD;
  font-size: 24px;
  padding: 12px 0;

  background: rgba(1, 22, 39, 0.84);
  box-shadow: inset 1px 5px 11px rgba(2, 18, 27, 0.71);
  border-radius: 8px;

`;

export const PLAY_AGAIN = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 15%;
  display: flex;
  justify-content: center;

  button {
    color: #607B96;
    border: none;
    font-size: 16px;
    background: none;
    font-weight: 600;

    cursor: pointer;
    transition: .3s all;

    &:hover {
      color: #7d94ac;
    }
  }
`;