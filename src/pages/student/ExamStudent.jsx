import Search from '~/assets/icons/Search';
import PracticeItem from './PracticeItem';

export default function ExamStudent() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <div className="pb-4 bg-white rounded-md">
        <label className="sr-only">Search</label>
        <div className="relative m-2 p-2 ">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search />
          </div>
          <input
            type="text"
            id="table-search"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
        <div className="max-h-[500px] overflow-y-auto flex flex-wrap">
          {/* <PracticeItem></PracticeItem> */}
        </div>
      </div>
    </div>
  );
}
