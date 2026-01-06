import { memo } from 'react';
import Herowin from '../components/win/Herowin';

const Win = () => {
  return (
    <main>
        <Herowin/>
    </main>
  );
};

export default memo(Win);