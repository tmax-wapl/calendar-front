import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { Options, Weekday } from 'rrule';
import { Icon, ContextMenu, Button, Switch } from '@wapl/ui';
import {
  RepeatInfoContainer,
  ItemContainer,
  RepeatIntervalInput,
  PickerContainer,
  DateWrapper,
  DatePickerWrapper,
  RepeatDay,
  ItemTitleContainer,
  Selected,
  RepeatLabel,
  RepeatItemWrapper,
  ContentWrapper,
  PickerWrapper,
  ButtonWrapper,
} from './RepeatInfo.style';
import { getRepeatSummary } from '@/utils';
import EventBar from './EventBar';
import SpinnerPickerItem from '@/common/components/SpinnerPicker/SpinnerPickerItem';
import DatePicker from '@/common/components/DatePicker/DatePicker';

interface Props {
  rrule?: Partial<Options>;
  startDate?: DateTime;
  defaultEndDate?: DateTime;
  repeatEndDate?: DateTime;
  onRRuleChange?: (value: Partial<Options>) => void;
  onStartChange?: (value?: DateTime) => void;
  onEndChange?: (value?: DateTime) => void;
}

const RepeatInfo = ({
  rrule,
  startDate,
  defaultEndDate,
  repeatEndDate,
  onRRuleChange,
  onStartChange,
  onEndChange,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [repeatToggle, setRepeatToggle] = useState(false);
  const [freq, setFreq] = useState<string>('2');
  const [unit, setUnits] = useState<string>('월');
  const [freqency, setFrequency] = useState<string[]>(Array.from({ length: 99 }, (_, i) => '' + (i + 1)));
  const units = ['일', '주', '월', '년'];

  const dayOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
  const byweekday = (rrule?.byweekday as Weekday[])?.map(({ weekday }) => weekday);

  const handleEndDateSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked },
    } = e;
    if (checked) onEndChange(defaultEndDate || DateTime.now());
    else {
      onEndChange();
    }
  };

  const handleEndDateChange = (selectedDate: DateTime) => {
    onEndChange(selectedDate);
  };

  const handleDayClick = (index: number) => {
    if (!byweekday.includes(index)) {
      onRRuleChange({ ...rrule, byweekday: [...byweekday, index].sort() });
      return;
    }
    if (byweekday.length === 1) {
      onRRuleChange({ ...rrule, byweekday: [startDate.weekday - 1] });
      return;
    }
    onRRuleChange({ ...rrule, byweekday: byweekday.filter(weekday => weekday !== index) });
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleFreqChange = (index: number) => setFreq(freqency[index]);

  const handleUnitsChange = (index: number) => {
    const freq = index + 1;
    setUnits(units[index]);
    onRRuleChange({
      ...(freq > -1 && { interval: 1, freq }),
      ...(freq === 2 && { byweekday: [startDate.weekday - 1] }),
    });
    onStartChange(freq > -1 ? startDate : undefined);
    onEndChange();
  };

  useEffect(() => {
    if (unit === '일') setFrequency(Array.from({ length: 999 }, (_, i) => '' + (i + 1)));
    else setFrequency(Array.from({ length: 99 }, (_, i) => '' + (i + 1)));
  }, [unit]);

  return (
    <RepeatInfoContainer>
      <ItemContainer onClick={handleOpen}>
        <RepeatItemWrapper>
          <Icon.RepeatLine className="mr-8" width={20} height={20} />
          반복안함
        </RepeatItemWrapper>
        <Icon.ArrowFrontLine width={20} height={20} />
      </ItemContainer>
      <ContextMenu open={open} onClose={handleClose}>
        <EventBar title={'반복 설정'} leftSide={[{ action: 'close', onClick: handleClose }]} />
        <ContentWrapper>
          <ItemTitleContainer>
            반복
            <Switch size="small" checked={repeatToggle} onChange={() => setRepeatToggle(!repeatToggle)} />
          </ItemTitleContainer>
          {repeatToggle ? (
            <>
              <PickerWrapper>
                <PickerContainer>
                  <Selected />
                  <SpinnerPickerItem
                    height={126}
                    itemHeight={42}
                    item={freqency}
                    selectedValue={freq}
                    onValueChange={handleFreqChange}
                  />
                  <SpinnerPickerItem
                    height={126}
                    itemHeight={42}
                    item={units}
                    selectedValue={unit}
                    onValueChange={handleUnitsChange}
                  />
                </PickerContainer>
                {rrule?.freq === 2 && (
                  <ItemContainer style={{ padding: '0 48px' }}>
                    {dayOfWeek.map((day, index) => {
                      return (
                        <RepeatDay
                          key={day}
                          className={`${byweekday?.includes(index) ? 'select' : ''}`}
                          onClick={() => handleDayClick(index)}
                        >
                          {day}
                        </RepeatDay>
                      );
                    })}
                  </ItemContainer>
                )}
              </PickerWrapper>
              <RepeatLabel style={{ marginBottom: '40px' }}>{`일정이 ${freq}${
                unit === '월' ? '개월' : unit
              } 간격 반복됩니다.`}</RepeatLabel>
              <ItemTitleContainer>
                반복 종료
                <Switch size="small" checked={!!repeatEndDate} onChange={handleEndDateSwitch} />
              </ItemTitleContainer>
              {repeatEndDate && (
                <DatePickerWrapper>
                  <DatePicker
                    size={1.3}
                    date={repeatEndDate}
                    onDateClick={handleEndDateChange}
                    backgroundColor="#F8F9FA"
                  />
                </DatePickerWrapper>
              )}
            </>
          ) : (
            <RepeatLabel>일정 반복이 꺼져있습니다.</RepeatLabel>
          )}
        </ContentWrapper>
        <ButtonWrapper>
          <Button width="100%" variant={'primary'} onClick={handleClose}>
            확인
          </Button>
        </ButtonWrapper>
      </ContextMenu>
    </RepeatInfoContainer>
  );
};

export default RepeatInfo;
