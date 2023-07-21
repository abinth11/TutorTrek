import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface CourseCategory {
  _id: string;
  name: string;
  courseCount: number;
}

interface Props {
  data: CourseCategory[];
}

const CourseCategoryChart: React.FC<Props> = ({ data }) => {
  const categoryNames = data.map((category) => category.name);
  const courseCounts = data.map((category) => category.courseCount);

  const donutChartOptions: ApexCharts.ApexOptions = {
    chart: {
      id: 'course-category-donut-chart',
      type: 'donut',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
        },
      },
    },
    labels: categoryNames,
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
  };

  const donutChartSeries:any = courseCounts;

  return (
    <div className="bg-white p-4 shadow rounded-md">
      <ReactApexChart options={donutChartOptions} series={donutChartSeries} type="donut" height={300} />
    </div>
  );
};

export default CourseCategoryChart;
