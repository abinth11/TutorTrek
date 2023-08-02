import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface CourseData {
  title: string;
  enrolled: number;
}

interface Props {
  data: CourseData[];
}

const TrendingCoursesChart: React.FC<Props> = ({ data }) => {
  const sortedData = data.sort((a, b) => b.enrolled - a.enrolled).slice(0, 5);

  const chartOptions: Partial<ApexOptions> = {
    chart: {
      id: 'trending-courses-chart',
    },
    xaxis: {
      categories: sortedData.map((course) => course.title),
      labels: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: 'Enrollment Count',
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth:35,
      },
    },
  };

  const chartSeries = [
    {
      name: 'Enrollment Count',
      data: sortedData.map((course) => course.enrolled),
    },
  ];

  return (
    <div className="bg-white p-4 shadow rounded-md">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar" 
        height={255}
      />
    </div>
  );
};

export default TrendingCoursesChart;
