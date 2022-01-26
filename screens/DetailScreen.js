import { View, Text, ScrollView, ActivityIndicator, Image, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

import { API_URL, API_TOKEN } from '../env'

const DetailScreen = ({ route }) => {
  const [loadingMovieDetail, setLoadingMovieDetail] = useState(true)
  const [loadingCast, setLoadingCast] = useState(true)
  const [movieDetailData, setMovieDetailData] = useState({})
  const [castData, setCastData] = useState([])

  const { id } = route.params

  const getMovieDetail = async () => {
    try {
      const response = await fetch(API_URL + '/movie/' + id, {
        headers: {
          'Authorization': 'Bearer ' + API_TOKEN
        }
      })
      
      const json = await response.json()
      setMovieDetailData(json)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingMovieDetail(false)
    }
  }

  const getCast = async () => {
    try {
      const response = await fetch(API_URL + '/movie/' + id + '/credits', {
        headers: {
          'Authorization': 'Bearer ' + API_TOKEN
        }
      })
      const json = await response.json()
      setCastData(json.cast)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingCast(false)
    }
  }

  useEffect(() => {
    getMovieDetail()
    getCast()
  }, [])

  return (
    <View style={styles.container}>
      <Header />
      {loadingMovieDetail && loadingCast ? <ActivityIndicator/> : (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.topInfos}>
            <Image 
              style={styles.image}
              source={{ uri: `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetailData.poster_path}` }} 
            />
            <View style={styles.rightInfos}>
              <Text style={styles.title}>{ movieDetailData.title }</Text>
              <Text style={styles.rate}>{ movieDetailData.vote_average }</Text>
              <Text style={styles.year}>{ movieDetailData.release_date.substr(0, 4) }</Text>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.genreList}
                data={movieDetailData.genres}
                renderItem={({ item, index }) => (
                  <Text style={styles.genreItem}>{ item.name }</Text>
                )}
                keyExtractor={item => item.id}
              />
            </View>          
          </View>        
          <Text style={styles.description}>{ movieDetailData.overview }</Text>
          <Text style={styles.castTitle}>Cast</Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.castList}
            data={castData}
            renderItem={({ item, index }) => (
              <View style={styles.castItem}>
                <Image 
                  style={styles.castItemImage}
                  source={{ uri: item.profile_path !== null ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}` : `https://via.placeholder.com/100x150` }} 
                />
                <Text style={styles.castItemName}>{ item.name }</Text>
                <Text style={styles.castItemTitle}>{ item.character }</Text>
              </View>            
            )}
            keyExtractor={item => item.id}
          />
        </ScrollView> 
      )}     
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    margin: 10
  },
  topInfos: {
    flexDirection: 'row'
  },
  image: {
    height: 225,
    width: 150
  },
  rightInfos: {
    flex: 1,
    marginLeft: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000'
  },
  rate: {
    backgroundColor: '#27ae60',
    color: '#ffffff',
    padding: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 10
  },
  year: {
    backgroundColor: '#34495e',
    color: '#ffffff',
    padding: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  genreList: {
    flexShrink: 1
  },
  genreItem: {
    backgroundColor: '#34495e',
    color: '#ffffff',
    padding: 3,
    borderRadius: 3,
    alignSelf: 'flex-start',
    marginRight: 5,
    fontSize: 12
  },
  description: {
    color: '#000000',
    marginTop: 10
  },
  castTitle: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 15
  },
  castList: {
    marginTop: 10
  },
  castItem: {
    width: 100
  },
  castItemImage: {
    height: 120,
    width: 80
  },
  castItemName: {
    color: '#000000',
    fontSize: 13
  },
  castItemTitle: {
    fontSize: 12
  }
})

export default DetailScreen