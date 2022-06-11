import styled from "styled-components";

export const HeaderLayout = styled.header`
  margin: 0 auto;
  width: 100%;
  background: rgba(243, 244, 246, 0.8);
`;
export const Inner = styled.div`
  @media screen and (max-width: 768px) {
  }
  margin: 0 auto;
  padding: 15px 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Title = styled.div``;
export const Logo = styled.h1`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.025em;
`;
export const LeftArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Text = styled.span`
  cursor: pointer;
  font-size: 15px;
  color: gray;
  letter-spacing: 0.025em;
  font-weight: 700;
`;
export const Hover = styled.div`
  position: relative;
`;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const Icon = styled.figure`
  margin-right: 10px;
  width: 40px;
`;
export const IconImage = styled.img`
  width: 100%;
  border-radius: 50%;
`;
export const List = styled.ul`
  position: absolute;
  top: 50px;
  right: 20px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.6s;

  &:before {
    content: "";
    position: absolute;
    top: -4px;
    right: 25px;
    width: 8px;
    height: 8px;
    border-top: 1px solid gray;
    border-right: 1px solid gray;
    background: gray;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  ${Hover}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;
export const ListItem = styled.li`
  background: gray;
`;
export const ListLink = styled.a`
  padding: 15px 0;
  display: inline-block;
  border-bottom: 1px solid #fff;
  width: 200px;
  transition: opacity 0.6s;
  cursor: pointer;
  font-size: 13px;
  color: #fff;
  font-weight: 700;

  &:hover {
    opacity: 0.6;
  }
`;
export const Button = styled.a`
  padding: 15px 0;
  display: inline-block;
  cursor: pointer;
  width: 200px;
  font-size: 13px;
  color: #fff;
  font-weight: 700;
  transition: opacity 0.6s;

  &:hover {
    opacity: 0.6;
  }
`;
