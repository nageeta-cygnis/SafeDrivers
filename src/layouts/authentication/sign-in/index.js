import { useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useNavigate } from "react-router-dom";
// Images
import bgImage from "assets/images/splash-bg.jpeg";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// Toast messages
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInSuccessfully = async () => {
    if (email === "") {
      toast.error("Please provide your email !", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
    } else if (password === "") {
      toast.error("Please provide your password !", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
    } else {
      let count = 0;
      let db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (doc.data().email === email && doc.data().password === password) {
          count += 1;
          navigate("/dashboard");
        }
      });
      if (count === 0) {
        toast.error("Invalid credentials !", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Safe Drivers
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={() => signInSuccessfully()}
                variant="gradient"
                color="info"
                fullWidth
              >
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <ToastContainer />
    </BasicLayout>
  );
}

export default Basic;
