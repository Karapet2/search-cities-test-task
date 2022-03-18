import { API_URL } from '../constants'

export function searchData(query, dispatch, handleError) {
  dispatch({ type: 'setLoading', payload: true })
  dispatch({ type: 'setSort', payload: null })
  const url = `${API_URL}${query ? ',' + query : query}&for=place`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch({ type: 'setHeaders', payload: data[0] })
      dispatch({ type: 'setResult', payload: data.slice(1) })
    }).catch(error => {
    handleError(error)
  })
    .finally(() => {
      dispatch({ type: 'setLoading', payload: false })
    });
}

