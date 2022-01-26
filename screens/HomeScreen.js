import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'

import Header from '../components/Header'
import Slider from '../components/Slider'
import Footer from '../components/Footer'

import { API_URL, API_TOKEN } from "../env"

const HomeScreen = ({ navigation }) => {
  const [loadingPopularMovies, setLoadingPopularMovies] = useState(true)
  const [loadingTrendMovies, setLoadingTrendMovies] = useState(true)
  const [popularMoviesData, setPopularMoviesData] = useState([])
  const [trendMoviesData, setTrendMoviesData] = useState([])

  const getPopularMovies = async () => {
    try {
      const response = await fetch(API_URL + '/movie/popular', {
        headers: {
          'Authorization': 'Bearer ' + API_TOKEN
        }
      })
      const json = await response.json()
      setPopularMoviesData(json.results)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingPopularMovies(false)
    }
  }

  const getTrendMovies = async () => {
    try {
      const response = await fetch(API_URL + '/movie/top_rated', {
        headers: {
          'Authorization': 'Bearer ' + API_TOKEN
        }
      })
      const json = await response.json()
      setTrendMoviesData(json.results)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingTrendMovies(false)
    }
  }

  useEffect(() => {
    getPopularMovies()
    getTrendMovies()
  }, [])

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        {loadingPopularMovies ? <ActivityIndicator/> : (
          <Slider title="Popular Movies" data={popularMoviesData} navigation={navigation} />
        )}
        {loadingTrendMovies ? <ActivityIndicator/> : (
          <Slider title="Trend Movies" data={trendMoviesData} navigation={navigation} />
        )}
      </ScrollView>      
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default HomeScreen