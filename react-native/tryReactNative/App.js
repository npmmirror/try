import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Picker, Alert } from 'react-native';
import {
  Button,
  Accordion,
  List,
  Icon,
  Provider,
  DatePicker,
  PickerView,
} from '@ant-design/react-native';
import { createAppContainer } from 'react-navigation';
import { Dropdown } from 'beeshell';
import {
  createStackNavigator,
  NavigationStackOptions,
} from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import nani from './nani.jpg';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  createDrawerNavigator,
  NavigationDrawerOptions,
} from 'react-navigation-drawer';
import ActionSheet from './ActionSheet';
import zhCN from '@ant-design/react-native/es/locale-provider/zh_CN';
import enUS from '@ant-design/react-native/es/locale-provider/en_US';
import ruRU from '@ant-design/react-native/es/locale-provider/ru_RU';
import esES from '@ant-design/react-native/es/locale-provider/es_ES';
import PKVIEW from './PKVIEW';
import Locale from './Locale';

const style = StyleSheet.create({
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nani: {
    width: 30,
    height: 30,
  },
  screen: {
    color: '#f00',
  },
});

class HomeScreen extends React.Component {
  static navigationOptions: NavigationStackOptions & NavigationDrawerOptions = {
    title: 'Home',
    headerTitle: () => <Image source={nani} style={style.nani} />,
    headerRight: () => (
      <Button onPress={() => Alert.alert('This is a button!')}>Info</Button>
    ),
    drawerLabel: 'MyHome',
    drawerIcon: ({ tintColor }) => (
      <Image source={nani} style={[style.nani, { tintColor: tintColor }]} />
    ),
  };

  render() {
    return (
      <ScrollView>
        <View style={style.flexCenter}>
          <Text style={style.screen}>Home Screen</Text>
          <Button
            onPress={() =>
              this.props.navigation.navigate('Details', {
                itemId: 55,
                otherParam: 'hello',
              })
            }>
            to Details
          </Button>
          <Button onPress={() => this.props.navigation.navigate('MyModal')}>
            show Modal
          </Button>
          <Button onPress={() => this.props.navigation.navigate('Settings')}>
            to Setting
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate('Notifications')}>
            Go to notifications
          </Button>
          <Button onPress={() => this.props.navigation.openDrawer()}>
            openDrawer
          </Button>
          <Button onPress={() => this.props.navigation.closeDrawer()}>
            closeDrawer
          </Button>
          <ActionSheet />
          <Icon name="account-book" size="md" color="red" />
          <BeeDropDown />
          <AntAccordion />
        </View>
      </ScrollView>
    );
  }
}

class AntAccordion extends React.Component {
  state = {
    activeSections: [],
  };

  onChange = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        onChange={this.onChange}
        activeSections={this.state.activeSections}>
        <Accordion.Panel header="Title 1">
          <List>
            <List.Item>Content 1</List.Item>
            <List.Item>Content 2</List.Item>
            <List.Item>Content 3</List.Item>
          </List>
        </Accordion.Panel>
        <Accordion.Panel header="Title 2">
          this is panel content2 or other
        </Accordion.Panel>
        <Accordion.Panel header="Title 3">
          Text text text text text text text text text text text text text text
          text
        </Accordion.Panel>
      </Accordion>
    );
  }
}

class BeeDropDown extends React.Component {
  render() {
    return (
      <Dropdown
        ref={c => {
          this.dropdown = c;
        }}
        // offsetX={this.state.offsetX}
        // offsetY={this.state.offsetY}
        cancelable={true}
        value={1}
        data={[
          {
            label: '我关注的',
            value: 1,
          },
          {
            label: '离我最近',
            value: 2,
          },
          {
            label: '综合评分最高的的的',
            value: 3,
          },
        ]}
        onChange={value => {
          console.log(value);
        }}
      />
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={style.flexCenter}>
        <Text>This is a modal!</Text>
        <Button onPress={() => this.props.navigation.goBack()}>Dismiss</Button>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = r => {
    const { navigation, navigationOptions } = r;
    return {
      title: navigation.getParam('otherParam', 'default value'),
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() {
    const { navigation } = this.props;
    console.log(navigation);
    return (
      <View style={style.flexCenter}>
        <Text>Details Screen</Text>
        <Text>
          itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>
        <Text>
          otherParam:
          {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text>
        <Button
          onPress={() =>
            navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })
          }>
          Go to Details... again
        </Button>
        <Button
          onPress={() =>
            navigation.setParams({
              otherParam: 'Updated',
            })
          }>
          Update title
        </Button>
      </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackImage: () => <Image source={nani} style={style.nani} />,
    },
    navigationOptions: {
      tabBarLabel: 'Home!',
    },
  },
);

const RootStack = createStackNavigator(
  {
    Main: MainStack,
    MyModal: ModalScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const languages = [
  {
    value: '中国',
    label: '中国',
    language: zhCN,
  },
  {
    value: 'English',
    label: 'English',
    language: enUS,
  },
  {
    value: 'Русский',
    label: 'Русский',
    language: ruRU,
  },
  {
    value: 'Español',
    label: 'Español',
    language: esES,
  },
];

class SettingsScreen extends React.Component {
  state = {
    locale: 'English',
  };

  onChange = console.log;

  render() {
    const { locale } = this.state;
    return (
      <ScrollView>
        <View style={style.flexCenter}>
          <Text>Settings!</Text>
          <Button onPress={() => this.props.navigation.navigate('Home')}>
            to Home
          </Button>
          {/*<Picker*/}
          {/*  data={languages}*/}
          {/*  onChange={this.onChange}*/}
          {/*  cols={1}*/}
          {/*  value={[locale]}>*/}
          {/*  <List.Item arrow="horizontal">Choose language</List.Item>*/}
          {/*</Picker>*/}
          {/*<Picker data={seasons} cascade={false}>*/}
          {/*  <List.Item arrow="horizontal">Picker</List.Item>*/}
          {/*</Picker>*/}
          <PickerView
            onChange={console.log}
            // value={this.state.value}
            data={seasons}
            cascade={false}
          />
        </View>
      </ScrollView>
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions: NavigationDrawerOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image source={nani} style={[style.nani, { tintColor: tintColor }]} />
    ),
  };

  render() {
    return (
      <Button onPress={() => this.props.navigation.goBack()}>
        Go back home
      </Button>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: RootStack,
    Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Settings') {
          iconName = 'ios-options';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
});

const AppContainer = createAppContainer(TabNavigator);

export default () => (
  // <Provider>
  // {/* <AppContainer />*/}
  // </Provider>
  <Locale />
);
