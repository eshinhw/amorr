import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Col, Card, CardBody } from "reactstrap";
import AuthContext from "../Authentication/AuthProvider";
import useAuth from "../Authentication/useAuth";
import { Box, Button, Container, Typography } from "@mui/material";

const ProfileProvider = () => {
  const { auth } = useAuth();

  const [Name, setName] = useState("");
  const [ServiceOne, setServiceOne] = useState("");
  const [ServiceTwo, setServiceTwo] = useState("");
  const [Title, setTitle] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Adress, setAdress] = useState("");
  const [City, setCity] = useState("");
  const [Province, setProvince] = useState("");
  const [Country, setCountry] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [NewPassword, setNewPassword] = useState("");


  // return (
  //   <Container>
      
  //     <Typography variant="h1">{auth.name}'s Profile</Typography>
  //     <Box display="flex" justifyContent="center" alignItems="center">
  //       <img src={require("../images/barber.jpg")} className="profileImage" />
  //       <Button>Change Profile Picture</Button>
  //     </Box>
  //     <Typography variant="h3">Change Email</Typography>
  //     <Typography variant="h3">Change Password</Typography>
  //     <Typography variant="h3">Update Account Info</Typography>
  //     <Typography variant="h3">Upload Sample Images</Typography>
  //   </Container>
  // );

  return (
    <div className="profileRow">
      <div className="profileColumn">
        <div
          className="profile"
          style={{
            display: "flex",
            justifyContent: "left",
            paddingTop: "10pt",
            paddingBottom: "30pt",
          }}
        >
          <br></br>
          <Col className="d-flex">
            <Card className="profileCard">
              <CardBody>
                <h1>My Profile</h1>
                <p>
                  <img src={require("../images/barber.jpg")} className="profileImage" />
                  <button>Change Profile Picture</button>
                </p>

                <input
                  className="profileInfoLine"
                  type="text"
                  placeholder="Service Provider Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="profileBasicInfo"
                  type="text"
                  placeholder="Service provided one"
                  onChange={(e) => setServiceOne(e.target.value)}
                />
                <input
                  className="profileBasicInfo"
                  type="text"
                  placeholder="Service provided two"
                  onChange={(e) => setServiceTwo(e.target.value)}
                />
                <br></br>
                <input
                  className="profileBasicInfo"
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  className="profileBasicInfo"
                  type="text"
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                  className="profileInfoLine"
                  type="text"
                  placeholder="Adress"
                  onChange={(e) => setAdress(e.target.value)}
                />
                <input
                  className="profileBasicInfo"
                  type="text"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  className="profileBasicInfo"
                  type="text"
                  placeholder="Province"
                  onChange={(e) => setProvince(e.target.value)}
                />
                <input
                  className="profileBasicInfo"
                  type="text"
                  placeholder="Country"
                  onChange={(e) => setCountry(e.target.value)}
                />
                <input
                  className="profileBasicInfo"
                  type="text"
                  placeholder="Postal Code"
                  onChange={(e) => setPostalCode(e.target.value)}
                />

                <div>
                  <button className="profileSaveButton">Save Edit on profile</button>
                  <button className="profileCancelButton">Cancel</button>
                </div>

                <br></br>
                <div>
                  <h4>Account Info</h4>
                </div>
                <input
                  className="profileInfoLine"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <h4>Change Password</h4>
                <div className="changPassword">
                  <input
                    className="profileBasicInfo"
                    type="text"
                    placeholder="Current Password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <input
                    className="profileBasicInfo"
                    type="text"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button className="profileButton">Edit password</button>
                </div>
                <br></br>
                <p>
                  <button className="profileButton">Upload more photos for display</button>
                </p>
                <div className="profileImgColumn">
                  <img src={require("../images/makeup.jpg")} className="profileImgDisplay" />
                  <button>delete image</button>
                </div>
              </CardBody>
            </Card>
          </Col>
          <div>
            {/* Route to external URL */}
            <button className="dataDashboard">
              <a href="https://app.powerbi.com/view?r=eyJrIjoiMjg0MzAxMDgtMzY3Yi00NWM5LTg3YTktODc0MDkxNTljYjYyIiwidCI6ImUyNTQ4MzhjLTcwMzYtNDU2NC04NTczLTYxODU0OTAwODFjZCJ9&pageName=ReportSection">
                Analytics Dashboard
              </a>
            </button>
            {/* <PowerBIEmbed
              embedConfig={{
                type: 'report', // Supported types: report, dashboard, tile, visual and qna
                id: '92c0e2e8-77b8-4dca-82a0-9851b47f5799',
                embedUrl:
                  'https://app.powerbi.com/reportEmbed?reportId=92c0e2e8-77b8-4dca-82a0-9851b47f5799&autoAuth=true&ctid=e254838c-7036-4564-8573-6185490081cd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWNlbnRyYWwtYi1wcmltYXJ5LXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9',
                accessToken:
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZTI1NDgzOGMtNzAzNi00NTY0LTg1NzMtNjE4NTQ5MDA4MWNkLyIsImlhdCI6MTY1OTE1MjQ4NywibmJmIjoxNjU5MTUyNDg3LCJleHAiOjE2NTkxNTY4NzcsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFaeWJPUko1aVJqNXZvc1daNE85WTFmSFJTdEw0K0pibFJDK0tBVUtabktoYjlTT3Zmb0VxNmpOcTZmNU81KzNoIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImZhbWlseV9uYW1lIjoiTGl1IiwiZ2l2ZW5fbmFtZSI6IkRldmluIiwiaXBhZGRyIjoiMTc0Ljk1LjE5Mi42NCIsIm5hbWUiOiJEZXZpbiBMaXUiLCJvaWQiOiI4YWEwMDg0Ny0xYzhmLTQ5MTctYmIzZC02ODc1NmE2MjI4NTUiLCJwdWlkIjoiMTAwMzIwMDIxMzc2NzBDQiIsInJoIjoiMC5BVmtBaklOVTRqWndaRVdGYzJHRlNRQ0J6UWtBQUFBQUFBQUF3QUFBQUFBQUFBQ2RBTzQuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoidnNGNzhkdDVRVW96Wk5MNXhYMHIxT29LTllTM3hDSk9LWGdCQkxhSUhkYyIsInRpZCI6ImUyNTQ4MzhjLTcwMzYtNDU2NC04NTczLTYxODU0OTAwODFjZCIsInVuaXF1ZV9uYW1lIjoiZGV2aW5saXVAdzZnMzQub25taWNyb3NvZnQuY29tIiwidXBuIjoiZGV2aW5saXVAdzZnMzQub25taWNyb3NvZnQuY29tIiwidXRpIjoiaGk5VFJMQk4xMDZJR1BEdkphWjVBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.v8Imdv3QXAlMqAXtfEDLFjXDMow7u7cTO_31VAMdvBrj92xwaFadzqHip9uBKHB79AzRLq3CiHTnZNqUUBBtRsKdRvqzyEgrsNL8N3MVXXKsE-D3KqZ9Ka6fD5imgyaJo2oJTQQkdCDG1eeLSDD6ckVif-BHH6te_-xGBRGXpr9l_553v3R75MN2_ZZXD0ZF1UOmx8w_yFa6GisHLvvuawtesUymuyfxHi2MRBUVi8cR4dl-jET7fX9jqqegR-tWAqyFN0iH0IYl-MFwAlhDAAKETHu-OaU0K7t4MO0H--JyCLf-T3KpwJ_KY5IYfIXxV4nHVBw0VyZXkUnTAc8D8Q',
                tokenType: models.TokenType.Aad,
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: false,
                    },
                  },
                  background: models.BackgroundType.Transparent,
                },
              }}
              eventHandlers={
                new Map([
                  [
                    'loaded',
                    function () {
                      console.log('Report loaded');
                    },
                  ],
                  [
                    'rendered',
                    function () {
                      console.log('Report rendered');
                    },
                  ],
                  [
                    'error',
                    function (event) {
                      console.log(event.detail);
                    },
                  ],
                ])
              }
              cssClassName={'report-style-class'}
              getEmbeddedComponent={(embeddedReport) => {
                window.report = embeddedReport;
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileProvider;
