// setupErrorHandling.js
import { LogBox } from "react-native";

const setupErrorHandling = () => {
    LogBox.ignoreAllLogs();
    LogBox.ignoreLogs([
        // Нативные предупреждения
        'Require cycle:',
        'Remote debugger',
        'Setting a timer',
        '[react-native-gesture-handler]',
        'AsyncStorage has been extracted',
        'ListView is deprecated',
        'componentWillReceiveProps',
        'componentWillMount',
        
        // Expo специфичные
        'expo-permissions is now deprecated',
        'Constants.manifest',
        'Constants.installationId has been deprecated',
        'Error loading font',
        'FontAwesome has been extracted',
        
        // React Navigation
        'Non-serializable values were found in the navigation state',
        'Cannot update a component',
        
        // Сетевые
        'Network request failed',
        'Error evaluating injectedJavaScript',
        
        // Lifecycle warnings
        'Can\'t perform a React state update',
        'Animated: useNativeDriver',
        
        // Dev режим
        'Running "main" with arguments',
        'Development server',
        
        // Прочие
        'VirtualizedLists should never be nested',
        'Warning: Failed prop type',
        'Possible Unhandled Promise Rejection',
        'Encountered two children with the same key'
    ]);
};

export default setupErrorHandling;
