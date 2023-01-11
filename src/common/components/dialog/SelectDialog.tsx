import { FormControl, FormControlLabel } from '@mui/material';
import { Dialog, Button, Radio, RadioGroup } from '@wapl/ui';
import { useEffect, useState } from 'react';
import { DialogButton } from './Dialog';
import { DialogButtonWrapper, SubTitle, Description, Title } from './Dialog.style';

type InputDialogProps = {
  open: boolean;
  title: {
    title?: string;
    subTitle?: string;
    description?: string;
  };
  buttons: DialogButton[];
};

interface RadioItem {
  label: string;
  value: string;
}

export const SelectDialog = ({ open, title, buttons }: InputDialogProps) => {
  const [selectItem, setSelectItem] = useState('');

  const handleChange = (value: string) => setSelectItem(value);

  const RepeatSelect = ({ selectType }: { selectType: string }) => {
    const radioItem: { [key: string]: RadioItem[] } = {
      // TODO: 세분화
      delete: [
        { label: '이 일정만', value: 'one' },
        { label: '이 일정 및 향후 일정', value: 'after' },
        { label: '모든 일정', value: 'all' },
      ],
      update: [
        { label: '이 일정 및 향후 일정', value: 'after' },
        { label: '모든 일정', value: 'all' },
      ],
    };

    return (
      <div style={{ margin: '0 42px' }}>
        <FormControl>
          <RadioGroup value={selectItem} onChange={(e, value) => handleChange(value)}>
            {radioItem[selectType].map(item => (
              <FormControlLabel
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
      </div>
    );
  };

  return (
    <Dialog open={open}>
      <Title>{title.title}</Title>
      <SubTitle>{title?.subTitle}</SubTitle>
      <Description>{title.description}</Description>
      <RepeatSelect selectType={'delete'} />
      <DialogButtonWrapper>
        {buttons?.map((button: DialogButton) => (
          <Button
            key={button.text}
            variant={button.variant}
            onClick={() => {
              if (selectItem) button.onClick(selectItem);
            }}
          >
            {button.text}
          </Button>
        ))}
      </DialogButtonWrapper>
    </Dialog>
  );
};
