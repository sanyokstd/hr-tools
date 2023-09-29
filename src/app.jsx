import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { FixLoader, ProtectedRoute } from 'src/components';
import {
  Auth,
  MainPage,
  NotFound,
  Personal,
  Poll,
  RolePage,
  UsersList,
  Vocations,
} from 'src/pages';
import { authActions } from 'src/store/actions';

const App = () => {
  const dispatch = useDispatch();
  const ifAuth = !!useSelector((state) => state.authReducer.userToken);
  const ifHasRole = useSelector((state) => state.authReducer.user.role);
  const fixWaiter = useSelector((state) => state.authReducer.fixWaiter);
  const waiter = useSelector((state) => state.authReducer.waiter);

  useEffect(() => {
    if (ifAuth) {
      dispatch(authActions.getUser());
    }
  }, []);

  return (
    <>
      {fixWaiter && <FixLoader />}
      {waiter ? (
        <FixLoader />
      ) : (
        <Routes>
          <Route path="auth/*" element={<Auth />} />
          <Route element={<ProtectedRoute ifPrivate={ifAuth} redirect="/auth" />}>
            <Route path="Personal/*" element={<Personal />} />
            <Route path="role" element={<RolePage />} />
            {ifHasRole ? (
              <>
                <Route path="/" element={<MainPage />} />
                {ifHasRole === 1 && <Route path="users-list/*" element={<UsersList />} />}

                <Route path="poll" element={<Poll />} />
                <Route path="vacation" element={<Vocations />} />
              </>
            ) : (
              <Route path="/" element={<RolePage />} />
            )}

            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
