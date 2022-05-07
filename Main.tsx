import {StatusBar} from 'expo-status-bar';
import {
    Animated, FlatList, Keyboard, ListRenderItem,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Checkbox from 'expo-checkbox';
import {useCallback, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from './src/redux/store';
import {
    addTaskAC,
    deleteTaskAC,
    swapIsDoneAC,
    TaskType,
    updateTitleAC
} from './src/redux/slice';
import {SuperText} from './SuperText';

export function Main() {
    const tasks = useAppSelector(state => state.reducer.tasks)
    const dispatch = useAppDispatch()

    const [show, setShow] = useState<boolean>(true)
    const [title, setTitle] = useState<string>('')

    const animatedValue = useRef(new Animated.Value(0)).current
    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -100],
    })

    const startAnimate = (show: boolean) => {
        if (show) {
            Animated.timing(animatedValue, {
                toValue: 1,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(animatedValue, {
                toValue: 0,
                useNativeDriver: true
            }).start()
        }
    }
    const close = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const changeIsDone = (id: number, isDone: boolean) => {
        dispatch(swapIsDoneAC({id, isDone}))
    }

    const addTask = () => {
        dispatch(addTaskAC({title}))
        setTitle('')
        close()
        Keyboard.dismiss()
    }

    const deleteTask = (id: number) => {
        dispatch(deleteTaskAC({id}))
    }

    const changeTitle = useCallback((id: number, title: string) => {
        dispatch(updateTitleAC({id, title}))
    }, [])

    const renderItem: ListRenderItem<TaskType> = ({item}) => (
        <View style={styles.row}>
            <Checkbox value={item.isDone} onValueChange={(value) => changeIsDone(item.id, value)}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%'}}>
                <SuperText title={item.title} id={item.id} changeTitle={changeTitle}/>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <View><Text style={styles.text}>X</Text></View>
                </TouchableOpacity>
            </View>
        </View>
    )

    return <>
        <StatusBar style="auto"/>
        <View style={styles.container}>
            <View>
                <FlatList data={tasks} keyExtractor={item => item.id.toString()}
                          renderItem={renderItem} showsVerticalScrollIndicator={false}/>
            </View>
        </View>
        <Animated.View style={{...styles.containerAbsolute, bottom: -80, transform: [{translateY}]}}>
            <View style={{height: 40, alignItems: 'center', marginTop: 10}}>
                <Text style={styles.separator} onPress={() => {
                    setShow(!show)
                    startAnimate(show)
                }}/>
            </View>
            <View style={styles.inputBox}>
                <TextInput style={styles.input} value={title} onChangeText={setTitle}/>
                <TouchableOpacity onPress={addTask}>
                    <View>
                        <Text style={{fontSize: 16, fontWeight: '500'}}>Add task</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Animated.View>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080b1a',
        paddingHorizontal: 20,
        marginTop: 50,
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#0d155c',
        marginVertical: 5,
        padding: 20,
        alignItems: 'center',
        borderRadius: 4,
        color: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 24,
        color: '#ffffff',
        marginLeft: 20,
    },
    containerAbsolute: {
        position: 'absolute',
        backgroundColor: '#c2c6d2',
        width: '100%',
    },
    separator: {
        width: 100,
        height: 15,
        backgroundColor: '#080b1a',
        overflow: 'hidden',
        borderRadius: 15 / 2
    },
    inputBox: {
        height: 80,
        backgroundColor: '#c2c6d2',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        width: 150,
        height: 36,
        backgroundColor: 'white',
        fontSize: 18,
    }
});