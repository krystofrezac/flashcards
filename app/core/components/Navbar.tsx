import { Link, Routes, useMutation } from 'blitz';
import React, { Suspense, useState } from 'react';
import { LogoutIcon } from '@heroicons/react/outline';
import logout from 'app/auth/mutations/logout';
import useCurrentUser from '../hooks/useCurrentUser';

import Avatar from './Avatar';
import Button from './Button';
import Dropdown from './Dropdown';
import Modal, { ModalActions, ModalTitle } from './Modal';

const AuthButtons: React.FC = () => {
  return (
    <div className="flex gap-2">
      <Link href={Routes.SignupPage()}>
        <Button element="a" size="sm">
          Register
        </Button>
      </Link>
      <Link href={Routes.LoginPage()}>
        <Button element="a" variant="primary" size="sm">
          Login
        </Button>
      </Link>
    </div>
  );
};

const UserAvatar: React.FC = () => {
  const [logoutDialog, setLogoutDialog] = useState(false);
  const user = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  if (user)
    return (
      <>
        <Modal open={logoutDialog}>
          <ModalTitle>Do you really want to logout?</ModalTitle>
          <ModalActions>
            <Button
              variant="ghost"
              onClick={(): void => {
                setLogoutDialog(false);
              }}
            >
              No
            </Button>
            <Button
              variant="error"
              onClick={async (): Promise<void> => {
                await logoutMutation();
                setLogoutDialog(false);
              }}
            >
              Yes
            </Button>
          </ModalActions>
        </Modal>

        <Dropdown
          trigger={<Avatar>{user.email[0]?.toUpperCase()}</Avatar>}
          options={[
            <Button
              key="logout"
              className="flex items-center text-error"
              simple
              onClick={(): void => {
                setLogoutDialog(true);
              }}
            >
              <LogoutIcon className="w-5 h-5" /> Logout
            </Button>,
          ]}
        />
      </>
    );

  return <AuthButtons />;
};

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-neutral shadow-xl rounded-box ">
      <div className="navbar-start">
        <Link href={Routes.Home()}>
          <Button
            className="normal-case text-white text-xl"
            element="a"
            variant="ghost"
          >
            Flashcards
          </Button>
        </Link>
      </div>
      <div className="navbar-end pr-4">
        <Suspense fallback={<AuthButtons />}>
          <UserAvatar />
        </Suspense>
      </div>
    </div>
  );
};

export default Navbar;
