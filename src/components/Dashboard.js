import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";

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
      <p>Dashboard</p>
    </>
  );
};

export default Dashboard;
