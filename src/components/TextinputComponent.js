import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../assets/colors';

const TextinputComponent = ({
  value,
  setValue,
  placeholder,
  errorMessage,
  isSecure,
  onFocus = () => {},
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <TextInput
        onChangeText={text => setValue(text)}
        value={value}
        autoCapitalize="none"
        style={[
          styles.textinput,
          {
            borderColor: errorMessage
              ? 'red'
              : isFocused
              ? colors.secondary
              : null,
            borderWidth: isFocused ? 2 : 0,
          },
        ]}
        placeholder={placeholder}
        secureTextEntry={isSecure}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />

      <Text style={styles.error}>{errorMessage}</Text>
    </>
  );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  textinput: {
    backgroundColor: 'white',
    width: width * 0.8,
    height: height * 0.05,
    borderRadius: width * 0.1,
    paddingHorizontal: 20,
  },

  error: {
    color: 'red',
    fontSize: width * 0.04,
    marginVertical: 8,
  },
});

export default TextinputComponent;
