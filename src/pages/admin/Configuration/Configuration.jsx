import { Card } from '~/components';
import { TabsMenu } from './components';
import { Outlet } from 'react-router-dom';

function Configuration() {
  return (
    <div className="w-full flex gap-x-4">
      <TabsMenu />
      <Card className="w-full">
        <Outlet />
      </Card>
    </div>
  );
}

export default Configuration;
