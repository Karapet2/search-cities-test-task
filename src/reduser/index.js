export const initialState = {
  result: [],
  loading: false,
  headers: [],
  sort: null
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'setResult':
      return {
        ...state,
        result: action.payload
      }
    case 'setLoading':
      return {
      ...state,
      loading: action.payload
    }
    case 'setSort':
      return {
      ...state,
      sort: action.payload
    }
    case 'setHeaders':
      return {
      ...state,
      headers: action.payload
    }
    case 'setSelectedFields':
      return {
      ...state,
        selectedFields: action.payload
    }
    case 'resetState':
      return {
      ...initialState
    }
    default:
      return { ...state }
  }
}