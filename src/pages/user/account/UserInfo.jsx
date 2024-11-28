import { useUserStore } from '~/store';
import images from '~/assets/images';

const RoleName = {
  ['admin']: 'Quản lý',
  ['student']: 'Học viên',
};

const UserInfo = () => {
  console.log('Loaded AccountInfo');

  const user = useUserStore((state) => state.user);

  return (
    <div className="w-full h-screen">
      <div className=" min-w-max relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="mx-auto max-w-md">
          <div className="divide-y divide-gray-300/50">
            <div className="justify-items-center space-y-6 py-8 text-base leading-7 text-gray-600">
              <div className="relative p-1 border border-primary rounded-full">
                <div className="rounded-xl overflow-hidden w-[48px] h-[48px] ">
                  <img src={user?.avatar || images.logo} alt="avatar" className="object-cover" />
                </div>
              </div>
              <p className="text-center text-primary font-extrabold text-xl">{user.fullName}</p>
              <div className=" text-center text-white font-bold  rounded bg-primary p-2">
                {user ? RoleName[user.role] : '--'}
              </div>
              {/* <!-- Stats --> */}
              <div className=" text-center font-semibold grid md:grid-flow-col md:grid-cols-2  w-full min-w-full max-w-max flex-wrap gap-4  md:place-content-around md:py-4">
                <div className="min-w-max justify-items-center rounded border-green-200 border-solid border-2 p-3 space-y-2">
                  <p className="">Số bài tập đã hoàn thành</p>
                  <p className="font-bold text-2xl">{user.numberOfCompleted ?? 0}</p>
                </div>
                <div className="min-w-max justify-items-center rounded border-green-200 border-solid border-2 p-3 space-y-2">
                  <p>Số bài đăng</p>
                  <p className="font-bold text-2xl">{user.numberOfPost ?? 0}</p>
                </div>
              </div>
              {/* <!-- Other info --> */}
            </div>
            <div className="grid py-4 min-w-max">
              <div className=" w-full grid grid-flow-col grid-cols-2 p-4 ">
                <div className="font-semibold ml-4">Email</div>
                <div className="ml-4">{user.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
