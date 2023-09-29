import styled from '@emotion/styled';

export const Row = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 15px;
`;

export const Img = styled.div`
  display: flex;
  align-items: center;
  background-image: url(${({ $img }) => $img});
  background-size: cover;
  background-position: center;
  border-radius: 100%;
  min-width: 50px;
  width: 50px;
  height: 50px;
  margin-right: 15px;
`;
export const Name = styled.div``;

export const Role = styled.div`
  font-weight: bold;
`;
