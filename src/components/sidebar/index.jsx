import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WorkIcon from '@mui/icons-material/Work';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { avatarDefault } from 'src/assets/images';
import { MyModal, UserIcon } from 'src/components';
import { getNowDate } from 'src/hooks';

import { AvatarEditModal } from './components';
import * as S from './styles';

const Sidebar = () => {
  const { avatar, email, contactsPhones, town, hireDate, position, workTime, manager, role } =
    useSelector((state) => state.authReducer.user);
  const [openAvatarEdit, setOpenAvatarEdit] = useState(false);
  const handleOpen = () => setOpenAvatarEdit(true);
  const handleClose = () => setOpenAvatarEdit(false);

  return (
    <>
      <S.Sidebar>
        <>
          <S.Avatar img={avatar || avatarDefault}>
            <S.AvatarEdit onClick={handleOpen}>
              <EditIcon sx={{ color: '#fff' }} />
            </S.AvatarEdit>
          </S.Avatar>
          <S.SidebarWrap>
            <S.Contacts>
              {email && (
                <S.ContactsItem>
                  <EmailIcon />
                  {email}
                </S.ContactsItem>
              )}
              {contactsPhones[0] && (
                <S.ContactsItem>
                  <PhoneAndroidIcon />
                  {contactsPhones[0].phone}
                </S.ContactsItem>
              )}

              <S.ContactsItem>
                <LocationOnIcon />
                Ukraine {town && `, ${town}`}
              </S.ContactsItem>
              {}
              {workTime && (
                <S.ContactsItem>
                  <AccessTimeIcon />
                  {workTime}
                </S.ContactsItem>
              )}

              {position && (
                <S.ContactsItem>
                  <WorkIcon />
                  {position}
                </S.ContactsItem>
              )}
            </S.Contacts>
            {hireDate && (
              <S.Data>
                Hire data
                <S.DataItem>{hireDate}</S.DataItem>
                <S.DataItem>{getNowDate()}</S.DataItem>
              </S.Data>
            )}
            {role === 2 && manager && (
              <UserIcon img={manager.avatar || avatarDefault} name={manager.fullName} isHr />
            )}
          </S.SidebarWrap>
        </>
      </S.Sidebar>

      <MyModal
        isOpen={openAvatarEdit}
        handleOpen={handleOpen}
        handleClose={handleClose}
        width={600}
      >
        <AvatarEditModal handleClose={handleClose} />
      </MyModal>
    </>
  );
};

export default Sidebar;
