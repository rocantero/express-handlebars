const pg = require('../config/db');
const moment = require('moment');

const QUERY = {
  start_date: '2020-11-01',
  end_date: '2021-11-30'
}
const LABELS = ['Nov 20', 'Dec 20', 'Jan 21', 'Feb 21', 'Mar 21', 'Apr 21', 'May 21', 'Jun 21', 'Jul 21', 'Aug 21', 'Sep 21', 'Oct 21', 'Nov 21'];
const COLORS = [ "rgb(139, 193, 247)", "rgb(189, 226, 185)", "rgb(162, 217, 217)", "rgb(178, 176, 234)", "rgb(249, 224, 162)", "rgb(244, 182, 120)",
  "rgb(201, 25, 11)", "rgb(124, 198, 116)", "rgb(115, 197, 197)", "rgb(132, 129, 221)", "rgb(246, 209, 115)", "rgb(239, 146, 52)",
  "rgb(163, 0, 0)", "rgb(76, 177, 64)", "rgb(0, 149, 150)", "rgb(87, 82, 209)", "rgb(244, 193, 69)", "rgb(236, 122, 8)", "rgb(125, 16, 7)",
  "rgb(184, 187, 190)", "rgb(56, 129, 47)", "rgb(0, 95, 96)", "rgb(60, 61, 153)", "rgb(240, 171, 0)", "rgb(196, 97, 0)", "rgb(71, 0, 0)", "rgb(138, 141, 144)", "rgb(35, 81, 30)",
  "rgb(0, 55, 55)", "rgb(42, 38, 95)", "rgb(197, 140, 0)", "rgb(143, 71, 0)", "rgb(44, 0, 0)", "rgb(106, 110, 115)" ];

const getData = async (query) => {
  const { start_date, end_date } = QUERY;
  try {
    // Select from deals and ignore deals_history
    const result = await pg('deals')
      .where('listing_date', '>=', start_date)
      .where('listing_date', '<=', end_date)
      .select('id', 'listing_date', 'site_id', 'revenue')
      .orderBy('listing_date', 'asc');
    
    // No need to do a Join as there's few sites compared to deals
    const siteIds = result.map(item => item.site_id);
    const sites = await pg('sites').whereIn('id', siteIds).select('id', 'title');

    // Map to quicly access broker name
    const siteMap = sites.reduce((acc, site) => { acc[site.id] = site.title; return acc} , {});

    const tableData = transformToTableData(result, siteMap);
    const chartData = transformToChartData(result, siteMap);
    
    return { tableData, chartData};
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

const transformToChartData = (data, siteMap) => {
  const grouped = data.reduce((acc, item) => {
    const { site_id, listing_date, revenue } = item;
    if (!acc[site_id]) {
      acc[site_id] = {};
    } 
    const month = moment(listing_date).format('MMM YY');
    if (!acc[site_id][month]) {
      acc[site_id][month] = 0;
    } 
    // Truncate revenue to avoid large numbers
    const truncatedRevenue = parseInt(revenue.toString().slice(-12));
    acc[site_id][month] += truncatedRevenue;
    return acc;
  }, {});


  const datasets = Object.keys(grouped).map((site_id, index) => {
    // Map over the LABELS constant to zero-fill missing months
    const data = LABELS.map(label => grouped[site_id][label] || 0);
    return {
      label: siteMap[site_id],
      data,
      fill: false,
      borderColor: COLORS[index],
      backgroundColor: ligthen(COLORS[index]),
      pointRadius: 6,
      pointHoverRadius: 8,
    }
  });
  
  const chartData = {
    labels: LABELS,
    datasets
  }
  return chartData;

  // ChartJS expects data in this format
  //  labels: ['Nov 20', 'Dec 20', 'Jan 21', 'Feb 21'],
  // datasets: [{
  //   label: 'Site 1',
  //   data: [50, 60, 70, 180]
  // }, {
  //   label: 'Site 2',
  //   data: [100, 200, 300, 400]
  // }]
}

const transformToTableData = (data, siteMap) => {
  return data.map(item => {
    const { id, listing_date, site_id, revenue } = item;
    return {
      id,
      month: moment(listing_date).format('MMMM YYYY'),
      date: moment(listing_date).format('MM-DD-YYYY'),
      broker: siteMap[site_id],
      revenue: formatToCurrency(revenue)
    }
  });
}

const formatToCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

const ligthen = (rgbColor) => {

  const rgbValues = rgbColor.slice(4, -1).split(',').map(Number);
  const [r, g, b] = rgbValues;

  // Lighten each component by 10 points
  const lightenedR = Math.min(r + 20, 255);
  const lightenedG = Math.min(g + 20, 255);
  const lightenedB = Math.min(b + 20, 255);

  // Return the new RGB string
  return `rgb(${lightenedR},${lightenedG},${lightenedB})`;
}

module.exports = {
  getData
};