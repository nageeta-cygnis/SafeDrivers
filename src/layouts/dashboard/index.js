// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import useFirebaseCalls from "hooks/useFirebaseCalls";
import { useEffect } from "react";
import moment from "moment";

let weekReportsBarChartData = {
  labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  datasets: { label: "Active", data: [0, 0, 0, 0, 0, 0, 0] },
};

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const { fetchUsers, getTotalRides, activeUsers, totalRides, totalIncidents } = useFirebaseCalls();

  useEffect(() => {
    fetchUsers();
    getTotalRides();
  }, []);

  const fetchRidesPerWeek = () => {
    let days = [];
    for (let i = 6; i >= 0; i--) {
      days.push(moment().subtract(i, "days").format("dd"));
    }
    weekReportsBarChartData = {
      labels: days,
      datasets: { label: "Active", data: [0, 0, 0, 0, 0, 0, 0] },
    };
    let weeklyRides = [];
    totalRides.map((ride) => {
      let rideStarted = moment(ride.created_at);
      let last = moment().subtract(6, "days");
      let now = moment();
      if (rideStarted.isBetween(last, now)) {
        weeklyRides.push(ride);
      }
    });
    let weekArr = {};
    weeklyRides.map((ride) => {
      if (weekArr[moment(ride.created_at).format("dd")] === undefined) {
        weekArr[moment(ride.created_at).format("dd")] = 1;
      } else {
        weekArr[moment(ride.created_at).format("dd")] += 1;
      }
    });
    weeklyRides.map((ride) => {
      let itemToFind = Object.entries(weekArr).find(
        (validRide) => validRide[0] === moment(ride.created_at).format("dd")
      );
      let indexToFind = weekReportsBarChartData.labels.findIndex(
        (day) => day === moment(ride.created_at).format("dd")
      );
      weekReportsBarChartData.datasets.data[indexToFind] = itemToFind?.[1];
    });
  };

  useEffect(() => {
    if (totalRides.length > 0) {
      fetchRidesPerWeek();
    }
  }, [totalRides]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Today's Users"
                count={activeUsers.length}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Rides"
                count={totalRides.length}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Total Incidents"
                count={totalIncidents}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Active this week"
                  description="Last Month Performance"
                  date="campaign sent 2 days ago"
                  chart={weekReportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Rides this year"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today rides.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Incidents this year"
                  description="Last Month Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects activeUsers={activeUsers} totalRides={totalRides} />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
