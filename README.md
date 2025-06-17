This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Project Folder Structure

```
AaraTech/
├── AaraTech/
│   ├── src/
│   │   ├── api/
│   │   │   └── placesApi.ts            # Google Places API calls
│   │   ├── components/
│   │   │   ├── MapViewComponent.tsx    # Google Map display
│   │   │   ├── SearchBar.tsx           # Search input with autocomplete
│   │   │   ├── SearchHistory.tsx       # History list display
│   │   ├── redux/
│   │   │   ├── placesSlices.ts         # Redux slice for places and history
│   │   │   └── index.ts                # Redux store setup
│   │   ├── screens/
│   │   │   └── HomeScreen.tsx          # Main UI layout combining above components
│   │   ├── utils/
│   │   │   └── constants.ts            # Google Map API related constants defined here
│   ├── app.json                        # Contains app name used in registerComponent 
│   ├── App.tsx                         # Main root component of the application
│   ├── index.js                        # Application entry point 
│   ├── package.json                    # Project packages and their versions are defined here
│   └── node_modules/                   # Node modules which are installed by npm or yarn command mentioned in below instructions
└── README.md
```

## Step 1: Install Node Modules

To install node_modules, run the following command from the root of your React Native project:

```sh
# Using npm
npm install

# OR using Yarn
yarn install 
or
yarn
```
*Please make sure you are having node version >= 18

## Step 2: Replace GOOGLE_API_KEY
To replace GOOGLE_API_KEY, go to following path
```
../src/utils/constant
and
../android/app/src/main/AndroidManifest.xml
```
## Step 3: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 4: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.


## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.