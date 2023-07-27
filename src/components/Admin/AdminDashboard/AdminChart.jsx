import React from 'react';
import ReactApexChart from 'react-apexcharts';
const colorPalette = ['#FF4560', '#008FFB', '#FEB019', '#00E396', '#775DD0', '#F86624', '#D7263D', '#1D755E', '#B3DDF2', '#6B798C'];

const AdminChart = ({ data }) => {
  // Function to group sales data by month and calculate total sales for each month

  const getMonthlySalesData = () => {
    const monthlySales = {};

    data?.forEach(item => {
      const date = new Date(item.createdAt);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Create a unique key for each month
      if (monthlySales[monthYear]) {
        monthlySales[monthYear] += item.total;
      } else {
        monthlySales[monthYear] = item.total;
      }
    });

    // Convert the aggregated sales data to an array of objects with month names
    return Object.keys(monthlySales).map(key => ({
      month: new Date(key + '-01').toLocaleString('default', { month: 'long' }),
      total: monthlySales[key],
    }));
  };



  const monthlySalesData = getMonthlySalesData();

  const monthlyChartData = {
    options: {
      chart: {
        id: 'monthly-bar',
      },
      xaxis: {
        categories: monthlySalesData.map(item => item.month),
      },
      plotOptions: {
        bar: {
          columnWidth: '10%',
        },
      },
    },
    series: [
      {
        name: 'Revenue',
        data:  monthlySalesData.map(item => item.total),
      },
    ],
    colors: colorPalette,
  };

  //========================================================================================================
  const getDonutChartData = () => {
    const cruiseBookings = {};
  
    // Group bookings by cruise name and count the number of bookings for each cruise
    data.forEach((booking) => {
      const cruiseName = booking.cruiseId.name;
      if (cruiseBookings[cruiseName]) {
        cruiseBookings[cruiseName]++;
      } else {
        cruiseBookings[cruiseName] = 1;
      }
    });
  
    // Convert the aggregated booking data to an array of objects with category and value properties
    return Object.keys(cruiseBookings).map((cruiseName) => ({
      category: cruiseName,
      value: cruiseBookings[cruiseName],
    }));
  };
  
  
  const donutChartData = getDonutChartData();


  const donutChartOptions = {
    chart: {
      id: 'donut-chart',
    },
    labels: donutChartData.map(item => item.category),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    colors: colorPalette,
  };
  
  const donutChartSeries = donutChartData.map(item => item.value);
  


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 ms-3 gap-10'>
      {/* Monthly Sales Chart */}
      <div className='rounded-lg bg-white mb-3 group h shadow-2xl ps-4 w-[90%]'>
        <h4 className='mb-5 pt-5'>Monthly Revenue Chart</h4>
        <ReactApexChart options={monthlyChartData.options} series={monthlyChartData.series} type="bar" height={350} />
      </div>

      {/* Donut Chart */}
      <div className='rounded-lg bg-white  shadow-2xl mb-3 ps-4 w-[90%]'>
        <h4 className='mb-5 pt-5'>Cruise wise Booking Chart</h4>
        <ReactApexChart options={donutChartOptions} series={donutChartSeries} type="donut" height={350} />
      </div>
    </div>
  );
};

export default AdminChart;
