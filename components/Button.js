import {View, Button, StyleSheet} from 'react-native';
import { useState } from 'react';

const Button = ({text, color, callBack}) => {

    const [backgroundColor, setBackgroundColor] = useState(color);
    const [buttonText, setButtonText] = useState(text);

    return (
        <View style={styles.container}>
            <Button title={text} onPress={callBack} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default Button;
