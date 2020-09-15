import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WeatherPage from "./components/WeatherPage";
import Table from "./components/Table";

function WeatherScreen() {
  return <WeatherPage />;
}

function ArchiveScreen() {
  return <Table />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Weather" component={WeatherScreen} />
        <Tab.Screen name="Archive" component={ArchiveScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
