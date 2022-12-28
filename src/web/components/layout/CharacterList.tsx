import { useState } from 'react';
import { Checkbox, Icon } from '@wapl/ui';
import { CharacterContainer, SubscriptionContainer, CheckBoxWrapper, SubscriptionButton } from './CharacterList.style';

const CharacterList = () => {
  const [categoryCheckList, setCategoryCheckList] = useState<Array<boolean>>([true, false]);
  const [subscriptionCheckList, setSubscriptionCheckList] = useState<Array<boolean>>([true, true, false]);
  const categoryItems = [
    { label: '캐릭터A의 캘린더', type: 'category', id: 1, color: '#FF46B5' },
    { label: '생일', type: 'category', id: 2, color: '#00C1B1' },
  ];
  const subscriptionItems = [
    { label: '길동과 친구들 in 괌', type: 'shared', id: 3, color: '#3384FF' },
    { label: 'G 캘린더', type: 'shared', id: 4, color: '#A143FF' },
    { label: 'PL2-2', type: 'shared', id: 5, color: '#FCBB00' },
  ];

  return (
    <CharacterContainer>
      {categoryItems.map((category, index) => (
        <CheckBoxWrapper
          key={category.id}
          calendarcolor={category.color}
          control={
            <Checkbox
              checked={categoryCheckList[index]}
              onChange={e =>
                setCategoryCheckList(prevlist => prevlist.map((item, idx) => (idx === index ? e.target.checked : item)))
              }
            />
          }
          label={category.label}
        />
      ))}
      <SubscriptionContainer>
        <SubscriptionButton>
          <Icon.Add2Line width={20} height={20} className="mr-8" color="#80868B" />
          구독 캘린더 추가
        </SubscriptionButton>
        {subscriptionItems.map((calendar, index) => (
          <CheckBoxWrapper
            key={calendar.id}
            calendarcolor={calendar.color}
            control={
              <Checkbox
                checked={subscriptionCheckList[index]}
                onChange={e =>
                  setSubscriptionCheckList(prevlist =>
                    prevlist.map((item, idx) => (idx === index ? e.target.checked : item)),
                  )
                }
              />
            }
            label={calendar.label}
          />
        ))}
      </SubscriptionContainer>
    </CharacterContainer>
  );
};

export default CharacterList;
