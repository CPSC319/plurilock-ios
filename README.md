# plurilock-ios
iOS plugin for bio-authentication via Plurilock services

## Installation

First, install dependencies by running npm install.
```bash
npm install
```

Run the application once in XCode, an error message about naming collisions will appear in the terminal. Run the following setup script to delete extraneous dependencies.

```bash
./setup.sh
```

## Testing
The Plurilock iOS plugin makes use of Mocha to run integration tests between the Plurilock server and the plugin itself. In order to run the tests, use the following command.

```bash
npm test
```

In order to run the unit tests for the data collection module of the plugin, open the project in XCode and click on the play button until a dropdown menu appears. Click test and the results will be outputted in the XCode console.