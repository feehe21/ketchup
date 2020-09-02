import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Settings: {
            screens: {
              SettingsScreen: 'settings',
            },
          },
          MC: {
            screens: {
              MCScreen: 'MC',
            },
          },
          MS: {
            screens: {
              MSScreen: 'MS',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
