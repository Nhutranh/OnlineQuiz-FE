import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getHistory, searchHistory } from "~/apis";
import Icons from "~/assets/icons";
import { Input } from "~/components";
import { useDebounce } from "~/hooks";

export default function ShowHistory() {
    const [searchKeywords, setSearchKeywords] = useState('');
    const [history, setHistory] = useState([]);
    const debounceQuery = useDebounce(searchKeywords, 200);

    useEffect(()=>{
        (async () => {
            const listHistory = await getHistory();
            setHistory(listHistory);
        })()
    }, [])

    useEffect(() => {
        (async () => {
          const searchValue = await searchHistory({ searchContent: debounceQuery });
          setHistory(searchValue || []);
        })();
      }, [debounceQuery]);

    console.log({history})

    const handleInputChange = (e) => {
        setSearchKeywords(e.target.value);
      };

    return(
        <div className="w-full">
            <div className="w-[500px] mb-5">
                <Input
                icon={<Icons.Search />}
                placeholder="Tìm kiếm theo tên bài tập"
                value={searchKeywords}
                onChange={handleInputChange}
                />
            </div>
            {history.map((item) => (
                 <div key={item.id} className="text-sm container mx-auto p-2 bg-slate-50 shadow-md rounded-md w-full mb-3">
                 <div key={item.id}>
                     <div className="flex">
                     <div className="w-[75%]">
                         <span className="text-lg font-semibold">Bài tập: {item.quiz.tittle} - {moment(item.startTime).format('DD/MM/YYYY')}</span>
                         <div>
                            <div className="flex">
                                <div className="font-bold">Bắt đầu làm bài: </div> {moment(item.startTime).format(' HH:mm')} - <div className="font-bold">Nộp bài: </div> {moment(item.submitTime).format('HH:mm')}
                            </div>
                             <div>Tổng thời gian: {item.durationTime} </div>
                             <div>Số câu đúng:  {item.numberOfCorrect} câu</div>
                             <div>Số câu sai:  {item.numberOfIncorrect} câu</div>
                         </div>
                     </div>
                     <div className="w-[25%] border-2 rounded-md p-3 right-0">
                         <h1 className="mb-5 text-center">Điểm: {item.marks}/{item.quiz.maxMarks} </h1>
                         <div className="bg-primary rounded-md p-2 font-bold text-white text-center">
                            <Link to={`startQuiz/${item.quiz.id}`} >
                                Làm bài lại
                            </Link>
                         </div>
                     </div>
                     </div>
                     <div className="text-sm text-green-900 font-medium italic">- Lời khích lệ!</div>
                 </div>
             </div>
            ))}
        </div>
    );
}

