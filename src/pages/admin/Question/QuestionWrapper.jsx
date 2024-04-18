import { useEffect } from 'react';
import { getQuestionTypes, getQuestions } from '~/apis';
import { Backdrop } from '~/components';
import { useQuestionStore } from '~/store';
import {
  CreateQuestionModal,
  FormEditQuestion,
  QuestionDelete,
  QuestionTable,
  ViewDetailQuestion,
} from './components';

const ModalFormObj = {
  ['view']: (
    <Backdrop opacity={0.25}>
      <ViewDetailQuestion />
    </Backdrop>
  ),
  ['edit']: (
    <Backdrop opacity={0.25}>
      <FormEditQuestion />
    </Backdrop>
  ),
  ['delete']: <QuestionDelete />,
};

function QuestionWrapper() {
  const { setQuestionList, modal, targetQuestion, setQuestionType } = useQuestionStore(
    (state) => state
  );

  useEffect(() => {
    (async () => {
      const listQuestion = await getQuestions();
      const questionTypes = await getQuestionTypes();
      setQuestionList(listQuestion);

      if (questionTypes && questionTypes.length > 0) {
        setQuestionType(
          questionTypes.map((type) => ({ display: type.displayName, value: type.alias }))
        );
      }
    })();
  }, [setQuestionList, setQuestionType]);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center w-full justify-between">
          <div />
          <CreateQuestionModal />
        </div>
        <div className="mt-4 w-full h-[calc(100%-4rem)]">
          <QuestionTable />
        </div>
      </div>

      {targetQuestion && modal && ModalFormObj[modal]}
    </>
  );
}

export default QuestionWrapper;
