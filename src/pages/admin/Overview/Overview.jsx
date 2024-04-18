import { Card } from '~/components';

function Overview() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-x-5 w-full">
        <Card className="w-full min-h-20" />
        <Card className="w-full min-h-20" />
        <Card className="w-full min-h-20" />
        <Card className="w-full min-h-20" />
      </div>
    </div>
  );
}

export default Overview;
