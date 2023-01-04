import { Dialog, Button, Icon } from '@wapl/ui';
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
  return (
    <Dialog open={open}>
      <InputDialogTitle>
        {title.title}
        <CloseButton onClick={onCloseClick}>
          <Icon.CloseLine />
        </CloseButton>
      </InputDialogTitle>
      <Input variant="filled" visibleClear={false} placeholder={placeholder} />
      <InputDialogDescription>{title.description}</InputDialogDescription>
      <DialogButtonWrapper>
        {buttons?.map((button: DialogButton) => (
          <Button key={button.text} variant={button.variant} onClick={() => button.onClick()}>
            {button.text}
          </Button>
        ))}
      </DialogButtonWrapper>
    </Dialog>
  );
};
