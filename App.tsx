import {StatusBar} from 'expo-status-bar';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {Main} from './Main';

export default function App() {
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <StatusBar style="auto"/>
                <Main/>
            </Provider>
        </NativeBaseProvider>
    );
}