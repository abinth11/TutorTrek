import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface CourseData {
  courseName: string;
  enrollmentCount: number;
  averageProgress: number; // Average progress of students in the course (0-100)
}

interface Props {
  data: CourseData[];
}

const EnrollmentAndProgressChart: React.FC<Props> = ({ data }) => {
  const courseNames = data.map((course) => course.courseName);
  const enrollmentData = data.map((course) => course.enrollmentCount);
  const progressData = data.map((course) => course.averageProgress);

  // Calculate percentage of enrollment count for each course
  const totalEnrollment = enrollmentData.reduce((sum, count) => sum + count, 0);
  const enrollmentPercentageData = enrollmentData.map(
    (count) => ((count / totalEnrollment) * 100).toFixed(2)
  );

  // Convert enrollmentPercentageData to an array of numbers
  const enrollmentPercentageNumbers = enrollmentPercentageData.map(Number);

  const donutChartOptions: ApexCharts.ApexOptions = {
    chart: {
      id: 'enrollment-percentage-chart',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%', // Adjust the size of the donut chart
        },
      },
    },
    labels: courseNames,
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
  };

  const donutChartSeries: any = enrollmentPercentageNumbers;

  return (
    <div className="bg-white p-4 shadow rounded-md">
      <ReactApexChart
        options={donutChartOptions}
        series={donutChartSeries}
        type="donut"
        height={300}
      />
    </div>
  );
};

export default EnrollmentAndProgressChart;
