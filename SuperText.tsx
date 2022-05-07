import {memo, useState} from 'react';
import {TextInput, Text, StyleSheet} from 'react-native';

type SuperTextPropsType = {
    id: number
    title: string
    changeTitle: (id: number, title: string) => void
}

export const SuperText = memo(({changeTitle, title, id}: SuperTextPropsType) => {
    const [value, setValue] = useState<string>(title)
    const [input, setInput] = useState<boolean>(false)

    const inputOn = () => setInput(true)

    const inputOff = () => {
        setInput(false)
        let trimmedTitle = value.trim()
        if (trimmedTitle) {
            changeTitle(id, trimmedTitle)
        }
    }

    return input
        ? <TextInput onChangeText={setValue} value={value} placeholder={'Enter title'}
                     autoFocus onBlur={inputOff} style={styles.input}/>
        : <Text onPress={inputOn} style={styles.text}>{title}</Text>
})

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 24,
        color: '#ffffff',
        marginLeft: 20,
    },
    input: {
        marginLeft: 20,
        width: 150,
        height: 36,
        backgroundColor: 'white',
        fontSize: 18,
    }
});