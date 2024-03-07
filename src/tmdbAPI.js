//Node

const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/configuration';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODk5MDAyYjliNTFmZDRkZmU2YWVhMzFlYzg1MTIwZiIsInN1YiI6IjY1ZWEwYWJjMzg5ZGExMDE4MGQ4MmIxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.angMo5jW-tFQIJO4UtJWUK_cTOEioz4-1xtjJUpSmpg'
  }
};

export const getMovie = fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));

export const API_KEY = "9899002b9b51fd4dfe6aea31ec85120f"

/* js
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODk5MDAyYjliNTFmZDRkZmU2YWVhMzFlYzg1MTIwZiIsInN1YiI6IjY1ZWEwYWJjMzg5ZGExMDE4MGQ4MmIxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.angMo5jW-tFQIJO4UtJWUK_cTOEioz4-1xtjJUpSmpg'
    }
  };
  
  fetch('https://api.themoviedb.org/3/configuration', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));*/
    