import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

export default function App() {

  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [arrival2, setArrival2] = useState("");

  function loadBusStopData() {

    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json(); 
      })
      .then((responseData) => {
        console.log("Original Data: ", responseData);

        const myBus = responseData.services.filter((item) => item.no === "15")[0];
        console.log("My Bus: ");
        console.log(myBus);

        setArrival(myBus.next.time);
        setArrival2(myBus.next2.time);
        setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" /> : `${new Date(arrival).getHours()}:${new Date(arrival).getMinutes()}:${new Date(arrival).getSeconds()}`}
      </Text>
      <Text style={[styles.arrivalTime, { fontSize: 20 }]}>
        {loading ? <ActivityIndicator size="large" /> : `${new Date(arrival2).getHours()}:${new Date(arrival2).getMinutes()}:${new Date(arrival2).getSeconds()}`}
      </Text>
      <TouchableOpacity style={styles.button} onPress={loadBusStopData}>
        <Text syle={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 20
  },
  arrivalTime: {
    fontWeight: "bold",
    fontSize: 52
  },
  button: {
    backgroundColor: "green",
    padding: 16,
    marginTop: 20
  },
  buttonText: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold"
  },
});
