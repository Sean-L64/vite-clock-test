import { useEffect, useState } from "react";

function Ip6() {
  const [ipv6, setIpv6] = useState(null); // Start with `null` to signify data hasn't loaded yet
  const [error, setError] = useState(''); // Error state is initially null, so we know it's loading

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setIpv6(data.ip); // Set the ipv6 address
      })
      .catch((err) => {
        setError("Could not fetch IPv6 address.");
        console.error(err);
      });
  }, []);

  // Displaying proper loading or error messages based on state
  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : ipv6 === null ? (
        <p>Loading...</p> // Show loading message if ipv6 is null
      ) : (
        <p>{ipv6}</p> // Display the IPv6 address once fetched
      )}
    </div>
  );
}

export default Ip6;
