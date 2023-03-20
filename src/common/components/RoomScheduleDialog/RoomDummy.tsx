import { Icon } from '@wapl/ui';
export interface RoomType {
  id: string;
  title: string;
  content: string;
  icon: JSX.Element;
}

export const RoomDummy: RoomType[] = [
  {
    id: 'talk',
    title: '서울시 교육청',
    content: '4/3일에 진행하는 회의는 어떻게 되어가나요???',
    icon: <Icon.KakaotalkLine width={16} height={16} />,
  },
  {
    id: 'calendar',
    title: 'UserB',
    content: '참고자료 준비하기',
    icon: <Icon.CalendarLine width={16} height={16} />,
  },
  {
    id: 'mail',
    title: '직업 박람회',
    content: '안녕하세요. 직업박람회 10기 이순범 입니다.',

    icon: <Icon.MailLine width={16} height={16} />,
  },
  {
    id: 'netflix',
    title: '홍길동',
    content: '마지막으로 한 대화',
    icon: <Icon.VideoOnLine width={16} height={16} />,
  },
  {
    id: 'test',
    title: '김철수',
    content: '마지막으로 한 대화',
    icon: <Icon.VideoOnLine width={16} height={16} />,
  },
  {
    id: 'talk2',
    title: '서울시 교육청',
    content: '4/3일에 진행하는 회의는 어떻게 되어가나요???',
    icon: <Icon.KakaotalkLine width={16} height={16} />,
  },
  {
    id: 'calendar2',
    title: 'UserB',
    content: '참고자료 준비하기',
    icon: <Icon.CalendarLine width={16} height={16} />,
  },
  {
    id: 'mail2',
    title: '직업 박람회',
    content: '안녕하세요. 직업박람회 10기 이순범 입니다.',
    icon: <Icon.MailLine width={16} height={16} />,
  },
  {
    id: 'netflix2',
    title: '홍길동',
    content: '마지막으로 한 대화',
    icon: <Icon.VideoOnLine width={16} height={16} />,
  },
  {
    id: 'test2',
    title: '김철수',
    content: '마지막으로 한 대화',
    icon: <Icon.VideoOnLine width={16} height={16} />,
  },
];
