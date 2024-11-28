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
      <div className="mx-auto max-w-full max-h-[80%] bg-white rounded">
        <div className="justify-items-center space-y-6 py-8 text-base leading-7 text-gray-600">
          <div className="relative p-1 border border-primary rounded-full">
            <div className="rounded-xl overflow-hidden w-[32px] h-[32px]  md:h-[52px] md:w-[52px]">
              <img src={user?.avatar || images.logo} alt="avatar" className="object-cover" />
            </div>
          </div>
          <p className="text-center text-primary font-extrabold text-xl md:text-2xl">
            {user.fullName}
          </p>
          <div className=" text-center text-white font-bold  rounded bg-primary p-2">
            {user ? RoleName[user.role] : '--'}
          </div>
          {/* <!-- Stats --> */}
          <div className="divide-y divide-slate-200 px-4 min-w-max">
            <div className=" text-center font-semibold grid md:grid-flow-col md:grid-cols-2  w-full min-w-full max-w-max flex-wrap gap-4  md:place-content-around md:py-4 overflow-hidden">
              <div className="min-w-min justify-items-center rounded bg-white border-primary border-solid border-2 p-3 space-y-2">
                <p className="truncate">Số bài tập đã hoàn thành</p>
                <p className="font-bold text-xl md:text-2xl">{user.numberOfCompleted ?? 0}</p>
              </div>
              <div className="min-w-min justify-items-center rounded bg-white border-primary border-solid border-2 p-3 space-y-2">
                <p className="truncate">Số bài đăng</p>
                <p className="font-bold text-xl md:text-2xl">{user.numberOfPost ?? 0}</p>
              </div>
            </div>
            {/* <!-- Other info --> */}
            <div className=" py-4 min-w-full">
              <div className=" w-full grid grid-flow-col md:grid-cols-2 flex-wrap p-4 gap-2 md:gap-4 ">
                <div className="font-semibold ">Email</div>
                <div className=" truncate">{user?.email ?? '---'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
