# Police Marking App
First, make sure your computer has installed `NodeJS`, `MongoDB`, `react-native-cli`, `AndroidSDK` with `Google Play` service installed
## Usage
Firstly, create a database named `GMapDB` in MongoDB. Then create a collection named `myCollection` in `GMapDB`
Then, insert TTL key into this collection:
```sh
> db.myCollection.createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } )
````
Then, install dependencies of server
```sh
$ cd RNProjectServer
$ npm install
````
Install dependencies & clean react-native app
```sh
$ cd RNProject
$ npm install
$ cd android
$ ./gradlew clean
$ cd ../
````
Next, start Android emulator
```sh
$ "$PATH_TO_ANDROIDSDK/tools/emulator.exe" -avd "$AVD_NAME"
````
Then, install react-native app on emulator
```sh
$ react-native run-android
````
## Note
This app is tested on Android api 23, IOS is currenly not tested.
## Author
tuannhse04791
