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
import { collection, query, getFirestore, where, getDocs } from "firebase/firestore";
import useFirebaseCalls from "hooks/useFirebaseCalls";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

let columns = [
  { Header: "name", accessor: "name", width: "25%", align: "left" },
  { Header: "reported incidents", accessor: "reported_incidents", align: "left" },
  { Header: "speed", accessor: "speed", align: "left" },
  { Header: "Ride started", accessor: "ride_started", align: "left" },
  { Header: "Status", accessor: "status", align: "center" },
];

const data = ["Nageeta", "Talha", "Hamdan", "Noman", "Maham", "Irtiza", "Aniqa"];
function Reporting() {
  const [rows, setRows] = useState([]);
  const { fetchUsers, activeUsers } = useFirebaseCalls();

  const [user, setUser] = useState("");

  const handleChange = (event) => {
    setUser(event.target.value);
  };
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

  const getUserByName = () => {
    let userToFind = activeUsers.find((_user) => _user.full_name === user);
    if (userToFind) {
      return userToFind.id;
    }
  };

  const getAllRides = async () => {
    setRows([]);
    let db = getFirestore();
    const q = query(collection(db, "rides"), where("user_id", "==", `${getUserByName()}`));
    const querySnapshot = await getDocs(q);
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
  };

  useEffect(() => {
    getAllRides();
  }, [user]);

  useEffect(() => {
    if (activeUsers.length > 0) {
      setUser(activeUsers[0].full_name);
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
                  User Reporting
                </MDTypography>
              </MDBox>
              <FormControl
                variant="standard"
                sx={{ m: 1, width: 300, alignSelf: "flex-end", marginTop: 2, paddingTop: 0.5 }}
              >
                <InputLabel id="demo-simple-select-standard-label">Select User</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={user}
                  onChange={handleChange}
                  label="User"
                >
                  {activeUsers.map((user) => {
                    return (
                      <MenuItem value={user.full_name} key={user.full_name}>
                        {user.full_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {rows.length > 0 ? ( // Conditionally render loader
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              ) : (
                <MDBox display="flex" justifyContent="center" py={3}>
                  <CircularProgress />
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Reporting;
