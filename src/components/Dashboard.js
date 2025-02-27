import { Table, useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const client = generateClient();
const Dashboard = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    // const { data: serviceRequestsData, errors } = await client.models.ServiceRequest.list();
    // console.log(data);
    const sub = client.models.ServiceRequest.observeQuery().subscribe({
      next: ({ items, isSynced }) => {
        setServiceRequests([...items]);
      },
    });
    console.log(serviceRequests);

    return () => sub.unsubscribe();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Id</TableCell>
              <TableCell align="right">Service Request Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Creation Date</TableCell>
              <TableCell align="right">Severity</TableCell>
              <TableCell align="right">Resolution Date</TableCell>
              <TableCell align="right">Reporter Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Location</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {serviceRequests.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.creation_date}</TableCell>
                <TableCell align="right">{row.severity}</TableCell>
                <TableCell align="right">{row.resolutionDate}</TableCell>
                <TableCell align="right">{row.reporterName}</TableCell>
                <TableCell align="right">{row.reporterEmail}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Dashboard;
