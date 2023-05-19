import { Dialog, Button, DialogHeader } from '@wapl/ui';
import { useState } from 'react';
import { DialogButton } from './Dialog';
import { Input, InputDialogDescription, InputDialogContent, DialogButtonWrapper } from './Dialog.style';

interface InputDialogProps {
  open: boolean;
  title: {
    title?: string;
    description?: string;
  };
  onCloseClick: () => void;
  placeholder?: string;
  buttons: DialogButton[];
}

export const InputDialog = ({ open, title, onCloseClick, placeholder, buttons }: InputDialogProps) => {
  const [input, setInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <Dialog open={open}>
      <DialogHeader title={title.title} handleClose={onCloseClick} />
      <InputDialogContent>
        <Input
          variant="filled"
          type="text"
          visibleClear={false}
          placeholder={placeholder}
          onChange={handleChange}
          autoFocus
        />
        <InputDialogDescription>{title.description}</InputDialogDescription>
      </InputDialogContent>
      <DialogButtonWrapper>
        {buttons?.map((button: DialogButton) => (
          <Button
            key={button.text}
            variant={button.variant}
            onClick={() => button.onClick(input.trim())}
            disabled={button.text !== '취소' && input.trim().length === 0}
          >
            {button.text}
          </Button>
        ))}
      </DialogButtonWrapper>
    </Dialog>
  );
};
