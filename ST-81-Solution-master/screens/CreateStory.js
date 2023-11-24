import React, { Component } from 'react';
import { 
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TextInput,
    Dimensions, 
    } from 'react-native';
import { RFValue } from " react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

let customFonts = {
    "Bubblegum-Sans" : requestAnimationFrame("../assets/fonts/BubblegumSans-Regular.ttf")
}

export default class CreateStory extends Component {
   constructor(props) {
    super(props);
    this.state = {
        fontsLoaded: false,
        previewImage: "image_1",
        dropdownHeight: 40,
    };
   }

   async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
   }

   componentDidMount(){
    this._loadFontsAsync();
   }

   render() {
    if (this.state.fontsLoaded) {
        let preview_images = {
            image_1: requestAnimationFrame("../assets/story_image_1.png"),
            image_2: requestAnimationFrame("../assets/story_image_2.png"),
            image_3: requestAnimationFrame("../assets/story_image_3.png"),
            image_4: requestAnimationFrame("../assets/story_image_4.png"),
            image_5: requestAnimationFrame("../assets/story_image_5.png"),
        };

        return (
            <View style={styles.container}>
              <SafeAreaView style={styles.droidSafeArea} />
              <View style={styles.appTitle}>
                <View style={styles.appIcon}>
                  <Image
                    source={require("../assets/logo.png")}
                    style={styles.iconImage}
                  ></Image>
                </View>
                <View style={styles.appTitleTextContainer}>
                  <Text style={styles.appTitleText}>New Story</Text>
                </View>
              </View>
              <View style={styles.fieldsContainer}>
                <Image
                  source={preview_images[this.state.previewImage]}
                  style={styles.previewImage}
                ></Image>
                <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                    items={[
                      { label: "Image 1", value: "image_1" },
                      { label: "Image 2", value: "image_2" },
                      { label: "Image 3", value: "image_3" },
                      { label: "Image 4", value: "image_4" },
                      { label: "Image 5", value: "image_5" },
                    ]}
                    defaultValue={this.state.previewImage}
                    open={this.state.dropdownHeight == 170 ? true : false}
                    onOpen={() => {
                      this.setState({ dropdownHeight: 170 });
                    }}
                    onClose={() => {
                      this.setState({ dropdownHeight: 40 });
                    }}
                    style={{
                      backgroundColor: "transparent",
                      borderWidth: 1,
                      borderColor: "white",
                    }}
                    textStyle={{
                      color: this.state.dropdownHeight == 170 ? "black" : "white",
                      fontFamily: "Bubblegum-Sans",
                    }}
                    onSelectItem={(item) =>
                      this.setState({
                        previewImage: item.value,
                      })
                    }
                  />
                </View>
              </View>
              <View style={{ flex: 0.08 }} />
            </View>
          );
    }
   }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c",
    },
    droidSafeArea: {
      marginTop:
        Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row",
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center",
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center",
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans",
    },
    fieldsContainer: {
      flex: 0.85,
    },
    previewImage: {
      width: "93%",
      height: RFValue(250),
      alignSelf: "center",
      borderRadius: RFValue(10),
      marginVertical: RFValue(10),
      resizeMode: "contain",
    },
  });
  