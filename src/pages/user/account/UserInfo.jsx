import { useUserStore } from '~/store';

const UserInfo = () => {
  console.log('Loaded AccountInfo');

  const user = useUserStore((state) => state.user);

  return (
    <div className="w-full">
      <div className="grid grid-cols-10">Hiiiiiiiiiiiii</div>
    </div>
  );
};

export default UserInfo;
