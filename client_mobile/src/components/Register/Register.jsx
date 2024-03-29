import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { validationFunc } from "./validationFunc";
import { addUser, findCreatedUser } from "../../store/actions/index";

export default function Register() {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    repassword: "",
  });

  const dispatch = useDispatch();
  const allReadyCreated = useSelector((state) => state.boolean);

  const [inputFullfilled, setInputFullfilled] = useState(false);
  const [readyToDispatch, setReadyToDispatch] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setInputs((input) => {
      const newInput = {
        ...input,
        [name]: value,
      };
      const errors = validationFunc(newInput);
      setErrors(errors);
      if (name === "email") {
        dispatch(findCreatedUser(newInput.email));
      }
      if (!Object.keys(errors).length) {
        setReadyToDispatch(true);
      } else setReadyToDispatch(false);
      return newInput;
    });
  };

  function onPressBtn(event) {
    event.preventDefault();
    if (readyToDispatch === true) {
      if (!allReadyCreated) {
        console.log("2", inputs);
        dispatch(addUser(inputs));
        setReadyToDispatch(false);
        alert("Usuario Creado");
        navigation.navigate("Login");
      } else {
        setInputs((input) => {
          const newInput = {
            ...input,
            email: "",
          };
          console.log(newInput);
          return newInput;
        });
        alert("Email no valido");
      }
    } else {
      setInputFullfilled(true);
      const errors = validationFunc(inputs);
      setErrors(errors);
      alert("Todos los casilleros son obligatorios");
    }
  }
  return (
    <View>
      <Image style={styles.img} source={require("./Logo.jpg")} />
      <View style={styles.inputContainers}>
        <TextInput
          placeholder="Nombre"
          name="name"
          style={
            inputFullfilled && errors.name ? styles.notfulfilled : styles.input
          }
          onChangeText={(e) => handleChange("name", e)}
          defaultValue={inputs.name}
        />
        {inputFullfilled && errors.name && (
          <Text style={styles.text}>{errors.name}</Text>
        )}

        <TextInput
          placeholder="Apellido"
          name="lastname"
          style={
            inputFullfilled && errors.lastname
              ? styles.notfulfilled
              : styles.input
          }
          onChangeText={(e) => handleChange("lastname", e)}
          defaultValue={inputs.lastname}
        />
        {inputFullfilled && errors.lastname && (
          <Text style={styles.text}>{errors.lastname}</Text>
        )}
        <TextInput
          placeholder="Telefono"
          name="phone"
          style={
            inputFullfilled && errors.phone ? styles.notfulfilled : styles.input
          }
          onChangeText={(e) => handleChange("phone", e)}
          defaultValue={inputs.phone}
          keyboardType="phone-pad"
        />
        {inputFullfilled && errors.phone && (
          <Text style={styles.text}>{errors.phone}</Text>
        )}
        <TextInput
          placeholder="Email"
          name="email"
          style={
            inputFullfilled && errors.email ? styles.notfulfilled : styles.input
          }
          onChangeText={(e) => handleChange("email", e)}
          defaultValue={inputs.email}
          keyboardType="email-address"
        />
        {inputFullfilled && errors.email && (
          <Text style={styles.text}>{errors.email}</Text>
        )}
        <TextInput
          placeholder="Contraseña"
          name="password"
          style={
            inputFullfilled && errors.password
              ? styles.notfulfilled
              : styles.input
          }
          onChangeText={(e) => handleChange("password", e)}
          defaultValue={inputs.password}
          secureTextEntry={true}
        />
        {inputFullfilled && errors.password && (
          <Text style={styles.text}>{errors.password}</Text>
        )}
        <TextInput
          placeholder="Repita Contraseña"
          name="repassword"
          style={
            inputFullfilled && errors.repassword
              ? styles.notfulfilled
              : styles.input
          }
          onChangeText={(e) => handleChange("repassword", e)}
          defaultValue={inputs.repassword}
          secureTextEntry={true}
        />
        {inputFullfilled && errors.repassword && (
          <Text style={styles.text}>{errors.repassword}</Text>
        )}
        <TouchableOpacity
          onPress={onPressBtn}
          disabled={
            !inputs.name ||
            !inputs.lastname ||
            !inputs.phone ||
            !inputs.email ||
            !inputs.password ||
            !inputs.repassword
              ? true
              : false
          }
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Registrar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.acount}>¿Ya estás registrado?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.login}>Iniciar Sesion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 280,
    height: 40,

    marginTop: 15,

    borderRadius: 20,
    borderWidth: 1,

    backgroundColor: "white",

    paddingLeft: 10,
  },
  img: {
    width: 150,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  inputContainers: {
    alignItems: "center",
  },
  notfulfilled: {
    width: 280,
    height: 40,

    marginTop: 15,

    borderRadius: 20,
    borderWidth: 1,

    backgroundColor: "white",

    borderColor: "red",
    color: "red",

    paddingLeft: 10,
  },
  button: {
    marginTop: 30,
    width: 130,
    height: 35,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "black",
  },
  loginContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
  },
  login: {
    marginLeft: 10,
    color: "blue",
  },
  acount: {
    marginRight: 10,
  },
  text: {
    textAlign: "justify",
    marginLeft: 10,
    marginRight: 10,
  },
});
