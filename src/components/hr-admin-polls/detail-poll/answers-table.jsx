import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material/';
import { useSelector } from 'react-redux';

import * as S from '../styles';

const AnswersTable = () => {
  const { questions, results, anonymous } = useSelector((state) => state.pollReducer.detailPoll);
  return (
    <S.AnswersTable>
      {results.length > 0 && (
        <>
          <S.detailTitle>Answers</S.detailTitle>
          <S.AnswersTableWrap>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {!anonymous && (
                      <>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Full name</TableCell>
                      </>
                    )}
                    {questions.map((td, index) => (
                      <TableCell key={td.id}>Question {index}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((row) => (
                    <TableRow key={row.id}>
                      {!anonymous && (
                        <>
                          <TableCell>
                            <S.AnswersTableAvatar>
                              {row.user.avatar ? <img src={row.user.avatar} alt="avatar" /> : '-'}
                            </S.AnswersTableAvatar>
                          </TableCell>
                          <TableCell>{row.user.fullName}</TableCell>
                        </>
                      )}

                      {questions.map((td) => (
                        <TableCell key={td.id} align={row.answers[td.id] ? 'left' : 'center'}>
                          {row.answers[td.id] ? (
                            <>
                              {row.answers[td.id].map((answer, index) => (
                                <span key={answer.id}>
                                  {answer.value}
                                  {row.answers[td.id].length > 1 &&
                                    index >= 0 &&
                                    index < row.answers[td.id].length - 1 &&
                                    ','}
                                </span>
                              ))}
                            </>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </S.AnswersTableWrap>
        </>
      )}
    </S.AnswersTable>
  );
};

export default AnswersTable;
