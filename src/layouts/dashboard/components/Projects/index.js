/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";
import MDProgress from "components/MDProgress";
import MDAvatar from "components/MDAvatar";

// Data
import data from "layouts/dashboard/components/Projects/data";

let tableColumns = [
  { Header: "name", accessor: "Name", width: "45%", align: "left" },
  { Header: "rides", accessor: "Rides", width: "10%", align: "left" },
  { Header: "incidents", accessor: "Incidents", align: "center" },
  { Header: "completion", accessor: "Completion", align: "center" },
];

// eslint-disable-next-line react/prop-types
function Projects(props) {
  // const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const [columns, setColumns] = useState(tableColumns);
  const [rows, setRows] = useState([]);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {image !== undefined && <MDAvatar src={image} name={name} size="sm" />}
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const getUserRides = (userId) => {
    let totalRide = props.totalRides.filter((ride) => ride.user_id === userId);
    return totalRide.length;
  };

  const getUserIncidents = (userId) => {
    let total = 0;
    let totalRide = props.totalRides.filter((ride) => ride.user_id === userId);
    totalRide.map((ride) => {
      total += ride.incidents.length;
    });
    return total;
  };

  const getUserProgress = (userId) => {
    let per = 0;
    let userTotalRides = getUserRides(userId);
    let userTotalIncidents = getUserIncidents(userId);
    if (userTotalRides === 0 && userTotalIncidents === 0) {
      return 0;
    } else {
      per = (userTotalRides.toString() / userTotalIncidents) * 100;
      return per;
    }
  };

  const updatedUserDetails = () => {
    setRows([]);
    props.activeUsers.map((user) => {
      let userRows = {
        Name: <Company name={user.full_name} />,
        Rides: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {getUserRides(user.id)}
          </MDTypography>
        ),
        Incidents: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {getUserIncidents(user.id)}
          </MDTypography>
        ),
        Completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress
              value={getUserProgress(user.id)}
              color="info"
              variant="gradient"
              label={false}
            />
          </MDBox>
        ),
      };
      setRows((prev) => [...prev, userRows]);
    });
  };

  useEffect(() => {
    updatedUserDetails();
  }, [props.activeUsers]);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Users
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>{props.activeUsers.length} active</strong> this month
            </MDTypography>
          </MDBox>
        </MDBox>
        {/* <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox> */}
        {/* {renderMenu} */}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
