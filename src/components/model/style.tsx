import styled from "styled-components";

export const Header = styled.div``;

export const Main = styled.div`
  padding: 20px 30px;
  position: fixed;
  background: rgb(235, 236, 240);
  width: 768px;
  min-height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

export const Button = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`;
export const TitleArea = styled.div``;

export const Title = styled.p`
  padding: 5px;
  background: #fff;
  border-radius: 5px;
  width: 65%;
  font-size: 26px;
  line-height: 24px;
  font-weight: 700;
`;

export const Date = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;

export const Body = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

export const LeftArea = styled.ul`
  width: 65%;
`;

export const LeftAreaList = styled.li`
  margin-top: 50px;

  &:first-child {
    margin-top: 0;
  }
`;

export const LeftAreaListItem = styled.div`
  margin-top: 10px;
  padding: 5px;
  background: #fff;
  border-radius: 5px;
`;

export const LeftAreaTitle = styled.p`
  margin: 15px 0 5px;
  font-size: 16px;
`;

export const LeftAreaForm = styled.form`
  margin-bottom: 10px;
`;

export const LeftAreaInput = styled.input`
  padding: 5px;
  width: 100%;
  height: 60px;
  border: 1px solid #333;
  font-size: 14px;
`;

export const RightArea = styled.div`
  width: 20%;
`;

export const RightAreaButton = styled.div`
  padding: 8px 15px;
  background: red;
  font-size: 14px;
  color: #fff;
  font-weight: 700;
`;

export const Overlay = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.64);
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;
