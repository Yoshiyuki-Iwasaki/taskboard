import styled from "styled-components";

export const Board = styled.div`
  padding: 15px 10px;
  width: 300px;
  background: #ebecf0;
  border-radius: 5px;
`;

export const Title = styled.h2`
  font-size: 22px;
  color: #333;
  font-weight: 700;
`;

export const Wrapper = styled.div`
  margin-top: 10px;

  &::first-child {
    margin-top: 0;
  }
`;

export const List = styled.div`
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

export const Button = styled.button`
  padding: 10px;
  width: 100%;
  text-align: left;
`;
export const Text = styled.p`
  font-size: 14px;
`;
