import { useParams } from 'react-router-dom';

const DetailView = () => {
  const { detailId } = useParams();

  console.log(detailId);

  return <div style={{ width: '380px', height: '100%', display: 'flex' }}>DetailView {detailId} 입니다.</div>;
};

export default DetailView;
