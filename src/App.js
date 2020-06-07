import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";
import Axios from "axios";


let allRepo = []


export default function App() {

  const [repositories, setRepositories] = useState([])
  const [likes, setLikes] = useState([])

  async function handleLikeRepository(repo) {
    const res = await api.post(`repositories/${repo.id}/like`)


    setRepositories([res.data]) // para funcionar normal, tirar essa linha de codigo e descomentar o getRepo

    // getRepo()





  }

  let getRepo = async () => {
    let response = await api.get('/repositories')
    let repositoriesRes = response.data
    await setRepositories(repositoriesRes)
    // console.log('---->', allRepo[0])

    // await setLikes(repositories[0].likes)

  }

  useEffect(() => {
    getRepo()


  }, [allRepo])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={el => el.id}
          renderItem={({ item: repository }) => (
            <View style={styles.repositoryContainer}>

              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>
                <Text style={styles.tech}>{repository.techs}</Text>
              </View>

              <View style={styles.likesContainer}
              >
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                >



                  {
                    repository.likes <= 1 ? `${repository.likes} curtida` : `${repository.likes} curtidas`
                  }
                  {/* {
                    repository.likes < 2 ? `${repository.likes} curtida` : `${repository.likes} curtidas`
                  } */}
                </Text>

              </View>

              <TouchableOpacity
                testID={`like-button-${repository.id}`}
                style={styles.button}
                onPress={() => handleLikeRepository(repository)}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>

            </View>
          )}

        />



        {/* <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>Repository 1</Text>

          <View style={styles.techsContainer}>
            <Text style={styles.tech}>
              ReactJS
            </Text>
            <Text style={styles.tech}>
              Node.js
            </Text>
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-1`}
            >
              3 curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(1)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-1`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",

  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    borderRadius: 6,
  },
});
