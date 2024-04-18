import { useState } from 'react';

import { Backdrop, Button } from '~/components';
import FormQuestionCreate from './FormQuestionCreate';

function CreateQuestionModal() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        className="w-full px-5 py-2 text-sm text-white bg-primary shadow-success hover:shadow-success_hover"
        onClick={() => setOpen(true)}
      >
        <p>Thêm câu hỏi</p>
      </Button>
      {open && (
        <Backdrop opacity={0.25}>
          <FormQuestionCreate onClose={() => setOpen(false)} />
        </Backdrop>
      )}
    </div>
  );
}

export default CreateQuestionModal;
