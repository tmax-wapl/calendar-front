interface EventSegmentCustom {
  event: {
    title: string;
    start: string;
    end: string;
    backgroundColor: string;
    borderColor: string;
  };
  start: string;
  end: string;
  isStart: boolean;
  isEnd: boolean;
}

type MoreLink = {
  target?: EventTarget;
  date: string;
  position: { top: number; left: number };
  events: EventSegmentCustom[];
};

export const PopoverData: MoreLink = {
  date: '11/11 (금)',
  position: { top: 0, left: 0 },
  events: [
    {
      event: {
        title: '5678~',
        start: '2022-11-11',
        end: '2022-11-26',
        backgroundColor: 'green',
        borderColor: 'green',
      },
      start: '2022-11-10T15:00:00.000Z',
      end: '2022-11-11T15:00:00.000Z',
      isStart: true,
      isEnd: false,
    },
    {
      event: {
        title: '3456~',
        start: '2022-11-11',
        end: '2022-11-24',
        backgroundColor: 'orange',
        borderColor: 'orange',
      },
      start: '2022-11-10T15:00:00.000Z',
      end: '2022-11-11T15:00:00.000Z',
      isStart: true,
      isEnd: false,
    },
    {
      event: {
        title: '1234~',
        start: '2022-11-11',
        end: '2022-11-22',
        backgroundColor: '#32a852',
        borderColor: '#32a852',
      },
      start: '2022-11-10T15:00:00.000Z',
      end: '2022-11-11T15:00:00.000Z',
      isStart: true,
      isEnd: false,
    },
    {
      event: {
        title: '어나더~',
        start: '2022-11-11',
        end: '2022-11-20',

        backgroundColor: '#4432a8',
        borderColor: '#4432a8',
      },
      start: '2022-11-10T15:00:00.000Z',
      end: '2022-11-11T15:00:00.000Z',
      isStart: true,
      isEnd: false,
    },
    {
      event: {
        title: 'The Title',
        start: '2022-11-11',
        end: '2022-11-15',

        backgroundColor: 'red',
        borderColor: 'red',
      },
      start: '2022-11-10T15:00:00.000Z',
      end: '2022-11-11T15:00:00.000Z',
      isStart: true,
      isEnd: false,
    },
    {
      event: {
        title: '다른거',
        start: '2022-11-11',
        end: '2022-11-13',

        backgroundColor: '#32a852',
        borderColor: '#32a852',
      },
      start: '2022-11-10T15:00:00.000Z',
      end: '2022-11-11T15:00:00.000Z',
      isStart: true,
      isEnd: false,
    },
  ],
};
