import { useCalendarStores } from '@/stores/StoreProvider';
import { Icon, styled } from '@wapl/ui';

const FAB = () => {
  const { uiStore } = useCalendarStores();

  const handleCreate = () => {
    uiStore.setPageDialogInfo('create');
  };

  return (
    <FABContainer onClick={handleCreate}>
      <Button>
        <Icon.Add2Line color={'#fff'} width={24} height={24} />
      </Button>
    </FABContainer>
  );
};

export default FAB;

const FABContainer = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 1;
`;

const Button = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  background: #5782f6;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
