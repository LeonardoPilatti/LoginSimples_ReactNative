import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const App = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [status, setStatus] = React.useState('');
  const [showCupom, setShowCupom] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleVerifyLogin = async () => {
    setStatus('');
    setShowCupom(false);
    setLoading(true);

    if (email.trim() != '' && password.trim() != '') {
      const req = await fetch('https://api.b7web.com.br/loginsimples/', {
        /// estou enviando para ver se consigo logar;
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password, //// como é o mesmo nome, posso só mandar ({email, password})
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await req.json();

      if (json.status == 'ok') {
        setStatus('Acesso LIBERADO!');
        setShowCupom(true);
      } else {
        setStatus('Acesso NEGADO!');
        setShowCupom(false);
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Desconto UltraBlaster</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={e => setEmail(e)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={e => setPassword(e)}
        secureTextEntry={true} /// para ele não aparecer a senha e mostrar ela codificada nesse secureTextEntry
      />

      <Button title="Verificar" onPress={handleVerifyLogin} />

      {loading && (
        <View style={styles.loadingArea}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}

      <Text style={styles.status}>{status}</Text>

      {showCupom && (
        <View style={styles.cupomArea}>
          <Text style={styles.cupomTitle}>Código de Cupom: </Text>
          <Text style={styles.cupomCode}>JAHRK123</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
  },
  header: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 45,
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#555',
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  status: {
    margin: 50,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  cupomArea: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 30,
  },
  cupomTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  cupomCode: {
    textAlign: 'center',
    fontSize: 40,
  },
  loadingArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;
