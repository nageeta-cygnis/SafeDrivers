import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useState } from "react";

export default () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [totalRides, setTotalRides] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [messages, setMessages] = useState([]);

  const fetchUsers = async () => {
    setActiveUsers([]);
    let db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      setActiveUsers((prev) => [...(prev ?? []), doc.data()]);
    });
  };

  const getTotalRides = async () => {
    setTotalRides([]);
    let db = getFirestore();
    let total = 0;
    const querySnapshot = await getDocs(collection(db, "rides"));
    querySnapshot.forEach((doc) => {
      setTotalRides((prev) => [...(prev ?? []), doc.data()]);
      total += doc.data().incidents.length;
    });
    setTotalIncidents(total);
  };

  const fetchMessages = async () => {
    setMessages([]);
    let db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "messages"));
    querySnapshot.forEach((doc) => {
      setMessages((prev) => [...(prev ?? []), doc.data()]);
    });
  };

  return {
    fetchUsers,
    activeUsers,
    getTotalRides,
    totalRides,
    totalIncidents,
    fetchMessages,
    messages,
  };
};
