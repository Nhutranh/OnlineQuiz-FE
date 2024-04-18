import { useState } from 'react';
import Icons from '~/assets/icons';
import images from '~/assets/images';
import { Button, DialogComfirm } from '~/components';
import { useAuth } from '~/hooks';
import { useUserStore } from '~/store';

const RoleName = {
  ['admin']: 'Quản lý',
  ['student']: 'Học viên',
};

function Header() {
  const { signOut } = useAuth();
  const user = useUserStore((state) => state.user);
  const [openMenu, setOpenMenu] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  return (
    <div className="fixed w-[calc(100%-250px)] h-[64px] flex items-center py-1 backdrop-blur-[6px] ml-[250px] bg-white  z-50 border-b border-dashed border-slate-300">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-4 text-icon">{/* Add on more feature */}</div>
        <div className="px-3 py-1 ml-3 rounded flex items-center gap-4 text-icon">
          <Icons.Notification />
          <div className="relative">
            <Button
              className={`flex items-center p-0 text-left cursor-pointer hover:text-primary border-none pl-4 pr-1 py-1 ${
                openMenu ? 'text-primary' : 'text-icon'
              } hover:bg-primary hover:text-primary hover:bg-opacity-10`}
              onClick={() => setOpenMenu(!openMenu)}
            >
              <div className="hidden pr-2 text-right md:flex flex-col justify-center h-full">
                <p className="font-bold text-sm">{user ? user.fullName : 'Unknown'}</p>
                <span className="font-semibold opacity-70 text-xs capitalize">
                  {user ? RoleName[user.role] : '--'}
                </span>
              </div>
              <div className="relative p-1 border border-primary rounded-full">
                <div className="rounded-xl overflow-hidden w-[24px] h-[24px] ">
                  <img src={user?.avatar || images.logo} alt="avatar" className="object-cover" />
                </div>
              </div>
            </Button>
            {openMenu && (
              <>
                <div className="absolute z-50 top-full right-0 bg-slate-100 rounded-md w-full min-w-[200px] min-h-[80px] shadow-xl">
                  <div className="flex flex-col p-2">
                    <div className="flex flex-col justify-center mb-2 text-icon">
                      <p className="font-semibold text-sm">{user ? user.fullName : 'Unknown'}</p>
                      <span className="font-semibold opacity-70 text-xs">
                        {user ? user.email : 'Unknown'}
                      </span>
                    </div>

                    <div className="w-full border border-strike opacity-40"></div>
                    <div className="flex flex-col mt-4">
                      <Button
                        className="flex w-full items-center gap-2 p-2 hover:bg-danger hover:bg-opacity-10 border-none text-danger"
                        onClick={() => setIsLogout(true)}
                      >
                        <Icons.LogOut />
                        <span className="text-sm">Đăng xuất</span>
                      </Button>
                    </div>
                  </div>
                </div>
                {isLogout && (
                  <DialogComfirm
                    className="max-w-[550px]"
                    color="danger"
                    title="Đăng xuất"
                    icon={<Icons.Exclamation />}
                    body="Bạn có chắc chắn muốn đăng xuất?"
                    onCancel={() => setIsLogout(false)}
                    onConfirm={() => signOut()}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
