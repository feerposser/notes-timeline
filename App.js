import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PeoplePage from './src/pages/PeoplePage';
import LoginPage from './src/pages/LoginPage'

const AppNavigator = createStackNavigator(
  {
    "Login": {
      screen: LoginPage,
      navigationOptions: {
        headerShown: false,
      }
    },
    'Pessoas': {
      screen: PeoplePage,
      navigationOptions: {
        title: 'Usuários',
        headerTitleStyle: {
          textAlign: 'left',
          fontSize: 16,
          color: '#ff914d',
        },
      }
    },
  },
  {
    defaultNavigationOptions: {
      title: "Notes Timeline",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomColor: 'red',
      },
      headerTitleStyle: {
        color: '#ff914d',
        fontSize: 20,
        flexGrow: 1,
        textAlign: 'center',
      }
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;