import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface CourseData {
  courseName: string;
  enrollmentCount: number;
}

interface Props {
  data: CourseData[];
}

const TrendingCoursesChart: React.FC<Props> = ({ data }) => {
  // Sort the data in descending order based on enrollment count to get top trending courses
  const sortedData = data.sort((a, b) => b.enrollmentCount - a.enrollmentCount).slice(0, 5);

  const chartOptions: Partial<ApexOptions> = {
    chart: {
      id: 'trending-courses-chart',
    },
    xaxis: {
      categories: sortedData.map((course) => course.courseName),
    },
    yaxis: {
      title: {
        text: 'Enrollment Count',
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
  };

  const chartSeries = [
    {
      name: 'Enrollment Count',
      data: sortedData.map((course) => course.enrollmentCount),
    },
  ];

  return (
    <div className="bg-white p-4 shadow rounded-md">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default TrendingCoursesChart;
