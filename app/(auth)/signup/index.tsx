import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { supabase } from '@/lib/supernaseClient'

export default function SignUp() {

  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignup = async () => {
    if(!name || !email || !password){
      setError("All fields are required")
      return
    }

    const { error } = await supabase.auth.signUp({
      email, password, options: {
        data: { name }
      }
    })

    if(error){
      setError(error.message || "Something went wrong")
      return
    }

    else router.replace('/')
   
    setError('')

    // router.replace('/(app)')
  }

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.title}>Create Account 🚀</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signin')}>
            <Text style={styles.signin}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f2f5f7',
    padding:20
  },
  card:{
    width:'100%',
    backgroundColor:'#fff',
    padding:25,
    borderRadius:20,
    elevation:4
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:6
  },
  subtitle:{
    color:'#666',
    marginBottom:20
  },
  input:{
    backgroundColor:'#f1f3f5',
    paddingVertical:14,
    paddingHorizontal:18,
    borderRadius:50,
    marginBottom:15,
    fontSize:16
  },
  button:{
    backgroundColor:'#002940',
    paddingVertical:14,
    borderRadius:50,
    alignItems:'center',
    marginTop:5
  },
  buttonText:{
    color:'#fff',
    fontWeight:'600',
    fontSize:16
  },
  error:{
    color:'red',
    marginBottom:10
  },
  footer:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:20
  },
  footerText:{
    color:'#666'
  },
  signin:{
    color:'#002940',
    fontWeight:'600'
  }
})
