import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { 
  ssr: false,
  loading: () => <div className="h-[300px] animate-pulse bg-gray-200 rounded-lg" />
});

export const ChartCard = memo(({ 
  title, 
  options, 
  series,
  height,
  type 
}: { 
  title: string;
  options: ApexOptions;
  series: any;
  height: number;
  type: "line" | "donut";
}) => (
  <Card className="bg-gray-50 border-none">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-gray-700">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Chart
        options={options}
        series={series}
        type={type}
        height={300}
      />
    </CardContent>
  </Card>
));

ChartCard.displayName = 'ChartCard';