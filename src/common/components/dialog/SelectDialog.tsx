import { FormControl } from '@mui/material';
import { Dialog, AlertWrapper, Button, Radio, RadioGroup } from '@wapl/ui';
import { useState } from 'react';
import { DialogButton } from './Dialog';
import {
  DialogButtonWrapper,
  SubTitle,
  Description,
  SelectDialogContent,
  SelectItemLabel,
  Title,
} from './Dialog.style';

interface SelectDialogProps {
  open: boolean;
  title: {
    title?: string;
    subTitle?: string;
    description?: string;
  };
  buttons: DialogButton[];
  selectType?: string;
}

interface RadioItem {
  label: string;
  value: string;
}

export const SelectDialog = ({ open, title, buttons, selectType = 'hideNone' }: SelectDialogProps) => {
  const [selectItem, setSelectItem] = useState(selectType === 'hideOne' ? 'after' : 'one');

  const handleChange = (value: string) => setSelectItem(value);

  const RepeatSelect = ({ selectType }: { selectType: string }) => {
    const radioItem: { [key: string]: RadioItem[] } = {
      hideNone: [
        { label: '이 일정만', value: 'one' },
        { label: '이 일정 및 향후 일정', value: 'after' },
        { label: '모든 일정', value: 'all' },
      ],
      hideOne: [
        { label: '이 일정 및 향후 일정', value: 'after' },
        { label: '모든 일정', value: 'all' },
      ],
      hideAll: [
        { label: '이 일정만', value: 'one' },
        { label: '이 일정 및 향후 일정', value: 'after' },
      ],
    };

    return (
      <FormControl>
        <RadioGroup value={selectItem} onChange={(e, value) => handleChange(value)}>
          {radioItem[selectType].map(item => (
            <SelectItemLabel
              key={item.value}
              value={item.value}
              control={<Radio sx={{ marginRight: '10px' }} />}
              label={item.label}
              sx={{
                marginBottom: '10px',
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  };

  return (
    <Dialog open={open}>
      <AlertWrapper>
        <Title>{title.title}</Title>
        <SubTitle>{title?.subTitle}</SubTitle>
        <Description>{title.description}</Description>
        <SelectDialogContent>
          <RepeatSelect selectType={selectType} />
        </SelectDialogContent>
      </AlertWrapper>
      <DialogButtonWrapper>
        {buttons?.map((button: DialogButton) => (
          <Button
            key={button.text}
            variant={button.variant}
            onClick={() => {
              if (button.text === '취소') button.onClick();
              else if (selectItem) button.onClick(selectItem);
            }}
          >
            {button.text}
          </Button>
        ))}
      </DialogButtonWrapper>
    </Dialog>
  );
};
