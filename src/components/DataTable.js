import { Table } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import { useMemo } from 'react'

function DataTable(props) {
  const { headers, sort, requestSort, selectOptions, paginatedResult } = props

  const getClassNamesFor = (name) => sort?.key === name ? sort.direction : undefined

  const getHeaderName = (name) => {
    switch (name) {
      case 'state':
      case 'NAME':
      case 'place':
        name = 'place'
        break
      case 'GEO_ID':
        name = 'Geography'
        break
      default:
        name = selectOptions.find(i => i.value === name).label
    }

    return name
  }

  const headersMemorized = useMemo(() => {
   return  headers.map((h, i) => (
      <th key={uuidv4()}>
        <button
          onClick={() => requestSort(i)}
          className={getClassNamesFor(h)}
        >
          {getHeaderName(h)}
        </button>
      </th>
    ))
  }, [headers, sort])

  const renderRows = () => {
    return <>
      {paginatedResult.map(r => (
        <tr key={uuidv4()}>
          {r.map(h => (
            <td key={uuidv4()}>{h}</td>
          ))}
        </tr>
      ))}
    </>
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
        <tr>
          {headersMemorized}
        </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </Table>
    </div>
  )
}

export default DataTable
