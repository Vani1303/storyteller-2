import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/logout";
import firebase from "firebase";

import CustomSideBarMenu from "../screens/CustomSideBarMenu";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true
        };
    }

    componentDidMount(){
        let theme;
        firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .on('"value', function (snapshot){
            theme = snapshot.val().current_theme;
        })
    }

    render() {
        let props = this.props;
        return(
            <Drawer.Navigator
            draweContent={props => <CustomSideBarMenu {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: "#e91e63",
                drawerInactiveTintColor: "grey",
                itemStyle: {marginVertical: 5}
            }}
            >
                <Drawer.Screen
                name= "MyHome"
                component={StackNavigator}
                options={{ unmountOnBlur: true }}
                />

                <Drawer.Screen
                 name="Profile"
                 component={Profile}
                 options={{ unmountOnBlur: true }}
                />

<Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
            </Drawer.Navigator>
        )
    }
}
