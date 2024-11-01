---
title: Guide to running Maestro end to end tests with Expo
description: Learn how you can run your Maestro tests with expo for both Android and IOS.
date: 'Nov 04 2024'
tags:
  - mobile
  - testing
published: false
---

This tutorial will not explain how to use Maestro or how to write tests with it. It will only explain how to run the tests with Expo. If you want to learn how to use Maestro, you can check the [official documentation](https://maestro.mobile.dev/).

## Prerequisites

You are going to need a linux or a apple machine to run the tests. You can also use a windows machine, but you will need to use WSL2 and it requires more configuration. This tutorial will cover macOs but the steps are similar for linux.

Make sure you have the following installed, I assume you already have your mobile environment set up.

- Maestro CLI

```bash
brew tap mobile-dev-inc/tapF
brew install maestro
```

- Expo CLI

```bash
npm install -g expo-cli
```

## Setting up the project

I made a simple project to demonstrate how to run the tests with Expo. You can follow along with the `starter` branch or clone the main branch to see the final result. The below steps are also viable if you are integrating Maestro into your own project.

```bash
git clone -b starter https://github.com/kutaui/expo-maestro.git
```

Login to your expo account

```bash
eas login
```

Configure the build and generate the `eas.json` file

```bash
eas build:configure
```

Now we need to add a custom profile to `eas.json` so we can run a development build. Here is how the final `eas.json` looks

```json
{
	"cli": {
		"version": ">= 12.6.2",
		"appVersionSource": "remote"
	},
	"build": {
		"development": {
			"developmentClient": true,
			"distribution": "internal"
		},
		"development-simulator": {
			"developmentClient": true,
			"distribution": "internal",F
			"ios": {
				"simulator": true
			}
		},
		"preview": {
			"distribution": "internal"
		},
		"production": {
			"autoIncrement": true
		}
	},
	"submit": {
		"production": {}
	}
}
```

Now we need to install `expo-dev-client`, this comes installed on the main branch but if you are following along with the starter branch or setting up for your own project you need to install it.

```bash
npx expo install expo-dev-client
```

## Building and Installing the app

Now we need to build the project with the development profile for IOS or Android. You can run the following command to build the project for IOS.

```bash
eas build --profile development-simulator --platform ios --local
```

Or for Android

```bash
eas build --profile development --platform android --local
```

Start the development client

```bash
npx expo start --dev-client
```

To install app on the IOS simulator follow these steps:

Extract the build with:

```bash
tar -xvzf build-*.tar.gz
```

Then install the app on the simulator with:

```bash
xcrun simctl install booted maestrotutorial.app
```

For the android you just need to drag and drop the apk to emulator.

## Running the tests

Now you need to create your test file, you can name it whatever you want. I usually store it inside the `.maestro` folder. Here is a working test for our example project.

```yaml
appId: com.kutaui.maestrotutorial
---
- launchApp
- tapOn: 'Email'
- inputText: 'test@gmail.com'
- tapOn: 'Password'
- inputText: 'password'
- tapOn:
    text: 'Login Button'
- assertVisible:
    text: 'Job Listings'
- tapOn:
    text: 'Software Engineer'
- assertVisible:
    text: 'Job Detail'
```

Now after you make sure you are running the expo development client, you can run the tests with the following command on another terminal.

```bash
maestro test .maestro/test.yaml
```
