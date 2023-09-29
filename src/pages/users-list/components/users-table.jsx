import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, MyModal } from 'src/components';
import { adminActions } from 'src/store/actions';

import * as S from '../styles';
import UserEdit from './user-edit/index';

const getRoleName = (id) => {
  switch (id) {
    case 1:
      return 'Admin';
    case 2:
      return 'Employee';
    case 3:
      return 'HR';
    default:
      return 'Zero';
  }
};

const UsersTable = ({ filterParam, searchId }) => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.adminReducer.usersList);
  const waiter = useSelector((state) => state.adminReducer.waiter);

  // Видалення
  const [deleteIsSuccess, setDeleteIsSuccess] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpen = () => setOpenDeleteModal(true);
  const handleClose = () => {
    setOpenDeleteModal(false);
    setDeleteIsSuccess(false);
  };

  const [selectUserId, setSelectUserId] = useState(0);

  const handleModalDelete = (id) => {
    setSelectUserId(id);

    handleOpen();
  };

  const handleDeleteDispatch = async () => {
    await dispatch(adminActions.adminDeleteUser(selectUserId));
    setDeleteIsSuccess(true);
  };

  useEffect(() => {
    dispatch(adminActions.adminGetUsers());
  }, []);

  // Filter
  const [userFiltred, setUsersFiltred] = useState([]);
  useEffect(() => {
    let list = usersList || [];
    if (searchId) {
      list = list.filter((item) => item.id === searchId);
    }
    if (filterParam.fRole !== 'all' && filterParam.fRole !== 'null') {
      list = list.filter((item) => item.role === Number(filterParam.fRole));
    } else if (filterParam.fRole === 'null') {
      list = list.filter((item) => item.role === null);
    }

    if (filterParam.fTime !== 'all') {
      if (filterParam.fTime === '1') {
        list = list.filter((item) => Boolean(item.workTime) === true);
      } else {
        list = list.filter((item) => Boolean(item.workTime) === false);
      }
    }

    if (filterParam.fPosada !== 'all') {
      if (filterParam.fPosada === '1') {
        list = list.filter((item) => Boolean(item.position) === true);
      } else {
        list = list.filter((item) => Boolean(item.position) === false);
      }
    }

    if (filterParam.fData !== 'all') {
      if (filterParam.fData === '1') {
        list = list.filter((item) => Boolean(item.hireDate) === true);
      } else {
        list = list.filter((item) => Boolean(item.hireDate) === false);
      }
    }

    setUsersFiltred(list);
  }, [usersList, filterParam, searchId]);

  // Редагування
  const buttonDeleteRef = useRef();
  const RowRef = useRef();
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEdit = () => setOpenEditModal(true);
  const handleCloseEdit = () => setOpenEditModal(false);
  const handleEdit = (e, userId) => {
    // клік поза рефом
    if (!e.target.querySelector('[delete-button]') && !e.target.closest('[delete-button]')) {
      setSelectUserId(userId);
      handleOpenEdit(userId);
    }
  };

  return (
    <>
      <S.UsersTable>
        <S.UsersTableTop>
          <S.UsersTableTopTitle>
            <PersonOutlineOutlinedIcon />
            Users
          </S.UsersTableTopTitle>
        </S.UsersTableTop>
        <S.UsersTableWrap>
          {!waiter ? (
            <>
              {userFiltred.length ? (
                <TableContainer component={Paper}>
                  <Table size="small" sx={{ minWidth: 750 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Surname</TableCell>
                        <TableCell align="center">Middle name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="center">Working hours</TableCell>
                        <TableCell align="center">Position</TableCell>
                        <TableCell align="center">Date of employment</TableCell>
                        <TableCell align="center">Operations</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userFiltred &&
                        userFiltred.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{ ' &:last-child th': { border: 0 } }}
                            hover
                            ref={RowRef}
                            onClick={(e) => handleEdit(e, row.id)}
                          >
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">{row.firstName || '-'}</TableCell>
                            <TableCell align="center">{row.lastName || '-'}</TableCell>
                            <TableCell align="center">{row.middleName || '-'}</TableCell>
                            <TableCell align="center">{row.email || '-'}</TableCell>
                            <TableCell align="center">{getRoleName(row.role)}</TableCell>
                            <TableCell align="center">{row.workTime || '-'}</TableCell>
                            <TableCell align="center">{row.position || '-'}</TableCell>
                            <TableCell align="center">
                              <S.tableData>{row.hireDate || '-'}</S.tableData>
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                delete-button={row.id}
                                color="error"
                                onClick={() => handleModalDelete(row.id)}
                                ref={buttonDeleteRef}
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <>there are no users</>
              )}
            </>
          ) : (
            <Loader />
          )}
        </S.UsersTableWrap>
      </S.UsersTable>

      <MyModal
        isOpen={openDeleteModal}
        handleOpen={handleOpen}
        handleClose={handleClose}
        width={500}
      >
        <S.UserDeleteModal>
          {deleteIsSuccess === true ? (
            <>
              <S.UserDeleteTitle>User deleted</S.UserDeleteTitle>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Button variant="contained" onClick={handleClose}>
                  Ок
                </Button>
              </Stack>
            </>
          ) : (
            <>
              <S.UserDeleteTitle>Delete this user?</S.UserDeleteTitle>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Button variant="contained" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" color="error" onClick={handleDeleteDispatch}>
                  Delete
                </Button>
              </Stack>
            </>
          )}
        </S.UserDeleteModal>
      </MyModal>

      <MyModal
        isOpen={openEditModal}
        handleOpen={handleOpenEdit}
        handleClose={handleCloseEdit}
        width={1300}
      >
        {openEditModal && <UserEdit userId={selectUserId} />}
      </MyModal>
    </>
  );
};

UsersTable.propTypes = {
  filterParam: PropTypes.objectOf(PropTypes.string).isRequired,
  searchId: PropTypes.number.isRequired,
};

export default UsersTable;
