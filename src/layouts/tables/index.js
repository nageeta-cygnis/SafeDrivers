/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import useFirebaseCalls from "hooks/useFirebaseCalls";
import { useEffect, useState } from "react";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

let columns = [
  { Header: "Name", accessor: "name", width: "45%", align: "left" },
  { Header: "Contact Number", accessor: "contact", align: "left" },
  { Header: "status", accessor: "status", align: "center" },
  { Header: "employed", accessor: "employed", align: "center" },
];

function Tables() {
  // const { columns, rows } = authorsTableData();
  const { activeUsers, fetchUsers } = useFirebaseCalls();
  const [rows, setRows] = useState([]);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {image !== undefined && <MDAvatar src={image} name={name} size="sm" />}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const setUserData = () => {
    setRows([]);
    activeUsers.map((user) => {
      let userRows = {
        name: <Author name={user.full_name} email={user.email} />,
        contact: <Job title={user.contact_number} description="Mobile number" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Active" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/12/23
          </MDTypography>
        ),
      };
      setRows((prev) => [...prev, userRows]);
    });
  };

  useEffect(() => {
    if (activeUsers.length > 0) {
      setUserData();
    }
  }, [activeUsers]);

  useEffect(() => {
    fetchUsers();
  }, []);

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
                  Users
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
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;
