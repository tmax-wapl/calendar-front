import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { Options, Weekday } from 'rrule';
import { Icon, ContextMenu, Button, Switch, Tooltip } from '@wapl/ui';
import {
  RepeatInfoContainer,
  PickerContainer,
  DateWrapper,
  DatePickerWrapper,
  RepeatDay,
  RepeatLabel,
  RepeatItemWrapper,
  PickerWrapper,
} from './RepeatInfo.style';
import EventBar from './header/EventBar';
import { SliderWheelPicker } from '@common/components/WheelPicker';
import DatePicker from './DatePicker/DatePicker';
import { getRepeatSummary } from '@/utils';
import { useCalendarStores } from '@/stores/StoreProvider';
import {
  BodyWrapper,
  ButtonWrapper,
  ContentWrapper,
  ItemContainer,
  ItemTitleContainer,
} from './common/styles/common.style';

interface Props {
  rrule?: Partial<Options>;
  startDate?: DateTime;
  defaultEndDate?: DateTime;
  repeatEndDate?: DateTime;
  onRRuleChange?: (value: Partial<Options>) => void;
  onStartChange?: (value?: DateTime) => void;
  onEndChange?: (value?: DateTime) => void;
}

interface FREQ_UNIT {
  [key: string]: number;
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
  const { eventStore } = useCalendarStores();
  const [open, setOpen] = useState(false);
  const [repeatToggle, setRepeatToggle] = useState(rrule ? true : false);
  const rruleUnits = ['년', '월', '주', '일'];
  const [intervals, setIntervals] = useState<string[]>(Array.from({ length: 99 }, (_, i) => '' + (i + 1)));
  const units = ['일', '주', '월', '년'];
  const freqUnits: FREQ_UNIT = { 일: 3, 주: 2, 월: 1, 년: 0 };
  const dayOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
  const byweekday = (eventStore.event.rrule?.byweekday as Weekday[])?.map(({ weekday }) => weekday);

  const handleEndDateSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked },
    } = e;
    if (checked) onEndChange(defaultEndDate || DateTime.now());
    else {
      onEndChange();
    }
  };

  const handleRepeatSwitch = () => {
    if (repeatToggle) onRRuleChange(undefined);
    else onRRuleChange({ interval: 1, freq: 2, byweekday: [startDate.weekday - 1] });
    setRepeatToggle(!repeatToggle);
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

  const handleOk = () => setOpen(false);

  const handleIntervalChange = (index: number) => {
    const interval = Number(intervals[index]);
    onRRuleChange({
      ...eventStore.event.rrule,
      interval,
    });
  };

  const handleUnitsChange = (index: number) => {
    const freq = freqUnits[units[index]];
    if (eventStore.event.rrule?.freq === freq) return;

    onRRuleChange({
      ...(freq > -1 && {
        interval: eventStore.event.rrule?.interval < 100 ? eventStore.event.rrule?.interval : 1,
        freq,
      }),
      ...(freq === 2 && { byweekday: [startDate.weekday - 1] }),
    });
    onStartChange(freq > -1 ? startDate : undefined);
    onEndChange();
  };

  const repeatSummary = () =>
    rruleUnits[eventStore.event.rrule?.freq] === '월' ? '개월' : rruleUnits[eventStore.event.rrule?.freq];

  useEffect(() => {
    if (rrule?.freq === 3) setIntervals(Array.from({ length: 999 }, (_, i) => '' + (i + 1)));
    else setIntervals(Array.from({ length: 99 }, (_, i) => '' + (i + 1)));
  }, [rrule?.freq]);

  useEffect(() => {
    setRepeatToggle(rrule ? true : false);
  }, [rrule]);

  return (
    <RepeatInfoContainer>
      <ItemContainer onClick={handleOpen}>
        <RepeatItemWrapper>
          <Icon.RepeatLine className="mr-8" width={20} height={20} />
          {rrule ? getRepeatSummary(rrule) : '반복안함'}
        </RepeatItemWrapper>
        <Icon.ArrowFrontLine width={20} height={20} />
      </ItemContainer>
      <ContextMenu open={open} onClose={handleClose}>
        <EventBar title={'반복 설정'} leftSide={[{ action: 'close', onClick: handleClose }]} />
        <BodyWrapper>
          <ContentWrapper>
            <ItemTitleContainer>
              반복
              <Switch size="small" checked={repeatToggle} onChange={handleRepeatSwitch} />
            </ItemTitleContainer>
            {repeatToggle ? (
              <>
                <PickerWrapper>
                  <PickerContainer>
                    {intervals.length === 999 && (
                      <SliderWheelPicker
                        slides={intervals}
                        loop={true}
                        initIndex={eventStore.event.rrule?.interval > 0 ? eventStore.event.rrule?.interval - 1 : 0}
                        onChange={handleIntervalChange}
                        align="flex-end"
                        width={34}
                      />
                    )}
                    {intervals.length === 99 && (
                      <SliderWheelPicker
                        slides={intervals}
                        loop={true}
                        initIndex={eventStore.event.rrule?.interval < 100 ? eventStore.event.rrule?.interval - 1 : 0}
                        onChange={handleIntervalChange}
                        align="flex-end"
                        width={34}
                      />
                    )}
                    <SliderWheelPicker
                      slides={units}
                      loop={true}
                      initIndex={1}
                      onChange={handleUnitsChange}
                      align="flex-start"
                      width={34}
                    />
                  </PickerContainer>
                  {rrule?.freq === 2 && (
                    <ItemContainer style={{ padding: '0 48px', maxWidth: '262px', margin: 'auto' }}>
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
                {eventStore.event.rrule && (
                  <RepeatLabel style={{ marginBottom: '24px' }}>
                    {`일정이 ${eventStore.event.rrule?.interval}${repeatSummary()} 간격 반복됩니다.`}
                  </RepeatLabel>
                )}
                <ItemTitleContainer>
                  반복 종료
                  <Switch size="small" checked={!!repeatEndDate} onChange={handleEndDateSwitch} />
                </ItemTitleContainer>
                {repeatEndDate && (
                  <>
                    <ItemTitleContainer>
                      종료 날짜
                      <Tooltip
                        disableHoverListener={startDate <= repeatEndDate}
                        placement="top"
                        title="시작일과 같거나 이후로 설정해 주세요."
                        sx={{ '.MuiTooltip-tooltip': { maxWidth: '250px' } }}
                      >
                        <DateWrapper isInvalid={startDate > repeatEndDate}>
                          {repeatEndDate.toFormat('yyyy.LL.dd')}
                        </DateWrapper>
                      </Tooltip>
                    </ItemTitleContainer>
                    <DatePickerWrapper>
                      <DatePicker date={repeatEndDate} onDateClick={handleEndDateChange} backgroundColor="#F8F9FA" />
                    </DatePickerWrapper>
                  </>
                )}
              </>
            ) : (
              <RepeatLabel>일정 반복이 꺼져있습니다.</RepeatLabel>
            )}
          </ContentWrapper>
          <ButtonWrapper>
            <Button width="100%" variant={'primary'} onClick={handleOk}>
              확인
            </Button>
          </ButtonWrapper>
        </BodyWrapper>
      </ContextMenu>
    </RepeatInfoContainer>
  );
};

export default RepeatInfo;
