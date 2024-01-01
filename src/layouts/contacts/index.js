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
import authorsTableData from "layouts/tables/data/authorsTableData";
import { useEffect, useState } from "react";
import useFirebaseCalls from "hooks/useFirebaseCalls";
import MDBadge from "components/MDBadge";

let columns = [
  { Header: "user", accessor: "user", width: "35%", align: "left" },
  { Header: "contact", accessor: "contact", align: "left" },
  { Header: "message", accessor: "message", align: "center" },
];

function Contacts() {
  const [rows, setRows] = useState([]);
  const { fetchMessages, messages } = useFirebaseCalls();

  useEffect(() => {
    fetchMessages();
  }, []);

  const Author = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
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

  useEffect(() => {
    setRows([]);
    messages.map((message) => {
      let newMessage = {
        user: <Author name={message.name} email={message.email} />,
        contact: <Job title={message.contactNumber} description="Mobile" />,
        message: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {message.message}
          </MDTypography>
        ),
      };
      setRows((prev) => [...prev, newMessage]);
    });
  }, [messages]);

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
                  Contact Requests
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

export default Contacts;
