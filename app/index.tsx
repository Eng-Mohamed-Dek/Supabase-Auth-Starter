import useAuth from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Index() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/(auth)/signin")
    }
  }, [user, loading])

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Logout error")
    }
  }

  // ✅ Show splash while checking session
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Checking session...</Text>
      </View>
    )
  }

  // Prevent flicker
  if (!user) return null

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome 👋</Text>
      <Text style={styles.subtitle}>You are logged in successfully</Text>

      <View style={styles.statusContainer}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>Logged In</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>📧 {user.email}</Text>
        <Text style={styles.cardSub}>
          Authenticated via Supabase
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f7fa',
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },

  // 🔥 Login Status
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#e6f9f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#22c55e",
    marginRight: 8,
  },

  statusText: {
    fontWeight: "600",
    color: "#15803d",
  },

  // 🔥 Card
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 20,
  },

  cardText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },

  cardSub: {
    color: '#777',
  },

  // 🔥 Logout Button
  logoutBtn: {
    backgroundColor: '#002940',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 3,
  },

  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
