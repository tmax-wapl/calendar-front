import Web from './web';
import Mobile from './mobile';

const App: React.FC = () => {
  const isMobile = false;

  return (
    <div id="appProvider">
      <div>calendar app</div>
      <div id="storeProvider">
        <div id="router">{isMobile ? <Mobile /> : <Web />}</div>
      </div>
    </div>
  );
};

export default App;
