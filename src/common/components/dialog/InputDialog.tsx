import { Dialog, Button, Icon } from '@wapl/ui';
import { useState } from 'react';
import { DialogButton } from './Dialog';
import { InputDialogTitle, CloseButton, Input, InputDialogDescription, DialogButtonWrapper } from './Dialog.style';

type InputDialogProps = {
  open: boolean;
  title: {
    title?: string;
    description?: string;
  };
  onCloseClick: () => void;
  placeholder?: string;
  buttons: DialogButton[];
};

export const InputDialog = ({ open, title, onCloseClick, placeholder, buttons }: InputDialogProps) => {
  const [input, setInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <Dialog open={open}>
      <InputDialogTitle>
        {title.title}
        <CloseButton onClick={onCloseClick}>
          <Icon.CloseLine />
        </CloseButton>
      </InputDialogTitle>
      <Input variant="filled" visibleClear={false} placeholder={placeholder} onChange={handleChange} autoFocus />
      <InputDialogDescription>{title.description}</InputDialogDescription>
      <DialogButtonWrapper>
        {buttons?.map((button: DialogButton) => (
          <Button key={button.text} variant={button.variant} onClick={() => button.onClick(input)}>
            {button.text}
          </Button>
        ))}
      </DialogButtonWrapper>
    </Dialog>
  );
};
