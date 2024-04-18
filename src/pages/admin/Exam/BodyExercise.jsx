import { Link } from 'react-router-dom';
import { TestData } from '~/TestData';
import { router } from '~/routes';

export default function BodyExercise() {
  return (
    <div className="m-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left table-auto rtl:text-right text-gray-500">
          <tbody>
            {TestData.map((item) => (
              <tr key={item.id} className="bg-white border-b ">
                <td className=" px-6 py-4 break-all">{item.tittel}</td>
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4">{item.number}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={router.detailExam} className="font-medium text-yellow-600 ">
                    Chi tiết
                  </Link>
                </td>

                <td className="px-6 py-4 text-right">
                  <Link className="font-medium text-red-600 ">Xóa</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
