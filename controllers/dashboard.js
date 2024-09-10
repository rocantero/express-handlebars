
const asyncHandler = require("express-async-handler");
const dashboardService = require("../services/dashboard");  

  // Method to handle GET request for /dashboard
exports.dashboard_get = asyncHandler(async(req, res, next) => {
    const { tableData, chartData } = await dashboardService.getData();
    res.render("dashboard", {
      title: "Dashboard",
      tableData,
      chartData: JSON.stringify(chartData), 
    }); 

});
