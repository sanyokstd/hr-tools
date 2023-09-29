import styled from '@emotion/styled';

export const Title = styled.div`
  font-size: 24px;
  border-bottom: 1px dashed #000;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
`;

export const PollList = styled.div``;

export const PollRow = styled.div`
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  @media (max-width: 767px) {
    flex-wrap: wrap;
    align-items: flex-start;
  }
  &:last-child {
    border-bottom: 0;
  }
`;

export const PollName = styled.div`
  font-size: 18px;
  max-width: 350px;
  flex: 0 0 350px;
  padding-right: 15px;

  @media (max-width: 767px) {
    margin-bottom: 15px;
    flex: 1;
    max-width: initial;
    font-size: 16px;
  }
`;

export const PollData = styled.div`
  flex: 1;
  text-align: center;
  padding-right: 15px;
  @media (max-width: 767px) {
    text-align: right;
    padding-right: 0;
    flex: auto;
    flex: 0 0 75px;
  }
`;

export const PollButton = styled.div`
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const HrList = styled.div``;

export const HrRow = styled.div`
  border-bottom: 1px solid #333;
  margin-bottom: 15px;
  padding-bottom: 15px;
  &:last-child {
    border-bottom: 0;
  }
`;

export const HrName = styled.div`
  font-size: 18px;
  display: inline-block;
  margin-bottom: 15px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const HrWrap = styled.div`
  display: flex;
`;

export const HrCol = styled.div`
  width: calc(100% / 3 - 10px);
  margin: 5px;
  padding: 5px;
  border-right: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-child {
    border-right: 0;
  }
`;

export const HrColInfo = styled.div`
  color: grey;
  font-size: 14px;
  text-align: center;
`;
export const HrColInfoItem = styled.div`
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const HrStatus = styled.div`
  text-align: center;
  font-size: 20px;
`;

export const HrStatusCount = styled.div`
  text-align: center;
  font-size: 20px;
`;

export const PollTitle = styled.div`
  font-size: 22px;
  margin-bottom: 25px;
  font-weight: bold;
`;

export const PollTitleAnonim = styled.div`
  font-size: 18px;
  margin-bottom: 25px;
  font-weight: bold;
`;

export const QaList = styled.div`
  margin: 25px 0;
`;

export const QaListRow = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 25px;
`;

export const QaListRowTypeFlex = styled.div`
  display: flex;
  align-items: center;
  svg {
    fill: #73c41d;
    margin-right: 5px;
  }
`;

export const Answers = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
`;

export const AnswersItem = styled.div`
  display: flex;
  align-items: ${({ $align }) => $align || `flex-start`};
  margin-bottom: 15px;
  position: relative;
`;
export const AnswersItemType = styled.div`
  svg {
    fill: #73c41d;
    margin-right: 5px;
  }
`;
export const AnswersItemDelete = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
`;
export const QaItem = styled.div`
  margin-bottom: 25px;
  max-width: 600px;
`;
export const QaTitle = styled.div`
  border-bottom: 1px solid #333;
  font-size: 18px;
  padding-bottom: 15px;
  padding-top: 15px;
`;

export const QaModalTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
export const detailTitle = styled.div`
  font-size: 22px;
  margin-bottom: 25px;
  font-weight: bold;
  @media (max-width: 600px) {
    margin-bottom: 0;
  }
`;
export const detailInfo = styled.div`
  color: grey;
`;
export const detailInfoItem = styled.div`
  margin-bottom: 10px;
`;
export const detailWorkersList = styled.div`
  max-width: 500px;
  width: 100%;
  @media (max-width: 600px) {
    margin-bottom: 25px;
  }
`;
export const detailStatus = styled.div`
  max-width: 500px;
  font-size: 20px;
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
`;

export const detailStatusText = styled.div`
  font-weight: bold;
  margin-left: 15px;
  font-size: 24px;
`;

export const detailStatusInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const AnswersTable = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
`;

export const AnswersTableWrap = styled.div`
  overflow: auto;
  width: 100%;
  td,
  th {
    font-size: 12px;
    border-right: 1px solid rgba(224, 224, 224, 1);
    border-left: 1px solid rgba(224, 224, 224, 1);
    padding: 6px 10px;
  }
  th {
    border-top: 1px solid rgba(224, 224, 224, 1);
    white-space: nowrap;
  }
`;

export const AnswersTableAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Paginate = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0;
    padding: 0;
    li {
      margin: 0 5px;
    }
    .next,
    .previous {
      display: none;
    }
    a {
      background: #73c41d;
      border-radius: 6px;
      color: #fff !important;
      display: block;
      font-size: 14px;
      font-weight: 700;
      line-height: 14px;
      padding: 8px 16px;
    }
    li.active a {
      background: rgb(80, 137, 20);
    }
    .break {
      pointer-events: none;
    }
  }
`;
