/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import MDBadge from "components/MDBadge";
import { collection, query, onSnapshot, getFirestore, doc } from "firebase/firestore";
import useFirebaseCalls from "hooks/useFirebaseCalls";

let columns = [
  { Header: "name", accessor: "name", width: "25%", align: "left" },
  { Header: "reported incidents", accessor: "reported_incidents", align: "left" },
  { Header: "speed", accessor: "speed", align: "left" },
  { Header: "Ride started", accessor: "ride_started", align: "left" },
  { Header: "Status", accessor: "status", align: "center" },
];

function Contacts() {
  const [rows, setRows] = useState([]);
  const { fetchUsers, activeUsers } = useFirebaseCalls();

  useEffect(() => {
    fetchUsers();
  }, []);

  const getUserName = (userId) => {
    let userToFind = activeUsers.find((user) => user.id === userId);
    return userToFind;
  };

  const getTopSpeed = (incidents) => {
    let maxSpeed = 0;
    incidents.map((item) => {
      if (maxSpeed < item.speed) {
        maxSpeed = item.speed;
      }
    });
    return maxSpeed * 3.6;
  };

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const getAllRides = () => {
    setRows([]);
    let db = getFirestore();
    const rideQuery = query(collection(db, "rides"));
    const rideSnapshot = onSnapshot(rideQuery, (querySnapshot) => {
      setRows([]);
      querySnapshot.forEach((doc) => {
        let newRide = {
          name: (
            <Job
              title={getUserName(doc.data().user_id).full_name}
              description={getUserName(doc.data().user_id).email}
            />
          ),
          reported_incidents: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {doc.data().incidents.length}
            </MDTypography>
          ),
          speed: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {getTopSpeed(doc.data().incidents)} Km/h
            </MDTypography>
          ),
          ride_started: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {doc.data().created_at}
            </MDTypography>
          ),
          status: (
            <MDBox ml={-1}>
              <MDBadge
                badgeContent={doc.data().isActive ? "Live" : "Ride ended"}
                color={doc.data().incidents.length > 0 ? "error" : "success"}
                variant="gradient"
                size="sm"
              />
            </MDBox>
          ),
        };
        setRows((prev) => [...prev, newRide]);
      });
    });
  };

  useEffect(() => {
    if (activeUsers.length > 0) {
      getAllRides();
    }
  }, [activeUsers]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Rides
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Contacts;
