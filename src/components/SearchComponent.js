import { useEffect, useState } from 'react'
import Select from 'react-select'
import styled from 'styled-components'

import DataTable from '../components/DataTable'
import Loading from './Loading'
import { SELECT_OPTIONS } from '../constants'
import { searchData } from '../api/search'
import { useErrorHandler } from 'react-error-boundary'
import Paginate from './Paginate'

const NoData = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
    font-weight: bold;
`

function SearchComponent({ state, dispatch }) {
  const handleError = useErrorHandler()

  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedResult, setPaginatedResult] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (state.result.length) {
      const data = [...state.result]
      const from = (currentPage - 1) * 10
      const to = from + 10
      setPaginatedResult(data.slice(from, to))
    }
  }, [currentPage, state.result])

  useEffect(() => {
    if (state.sort) {
      sortResult()
    }
  }, [state?.sort?.direction, state?.sort?.index])

  const handleSelectChange = (e) => {
    dispatch({ type: 'selectedFields', payload: e })
    const query = e.map(item => item.value).join()
    setCurrentPage(1)
    fetchData(query)
  }

  const fetchData = (query = '') => searchData(query, dispatch, handleError)

  const sortResult = () => {
    const { sort } = state
    let sortableItems = [...state.result]
    if (sort) {
      sortableItems.sort((a, b) => {
        if (a[sort.index] < b[sort.index]) {
          return sort.direction === 'asc' ? -1 : 1
        }
        if (a[sort.index] > b[sort.index]) {
          return sort.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    dispatch({ type: 'setResult', payload: sortableItems })
  }

  const requestSort = (index) => {
    const { sort } = state
    const sortOption = {
      index,
      key: state.headers[index],
      direction: 'asc'
    }
    if (sort?.key === sortOption.key && sort.direction === 'asc') {
      sortOption.direction = 'desc'
    }
    dispatch({type: 'setSort', payload: sortOption})
  }

  return (
    <div>
      <div className="select-section">
        <Select
          value={state.selectedFields}
          onChange={(e) => handleSelectChange(e)}
          options={SELECT_OPTIONS}
          isMulti
        />
      </div>
      {!state.loading ? (
        paginatedResult.length ? (
          <>
            <DataTable
              paginatedResult={paginatedResult}
              headers={state.headers}
              sort={state.sort}
              selectOptions={SELECT_OPTIONS}
              requestSort={requestSort}
            />
            <Paginate
              total={state.result.length}
              currentPage={currentPage}
              handlePageChange={setCurrentPage}
            />
          </>
        ) : <NoData>No Result</NoData>
      ) : <Loading />
      }
    </div>
  )
}

export default SearchComponent
