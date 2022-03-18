import { Pagination } from 'react-bootstrap'
import { useEffect, useState } from 'react'

function Paginate({ total, currentPage, handlePageChange }) {
  const [pagesArray, setPagesArray] = useState([])

  useEffect(() => {
    let totalPages = Math.ceil(parseInt(total) / 10)
    let page = parseInt(currentPage)
    let pages = []
    if (totalPages > 1) {
      if (totalPages <= 9) {
        let i = 1
        while (i <= totalPages) {
          pages.push(i)
          i++
        }
      } else {
        if (page <= 5) {
          pages = [1, 2, 3, 4, 5, 6, 7, 8, '', totalPages]
        } else if (totalPages - page <= 4) {
          pages = [
            1,
            '',
            totalPages - 7,
            totalPages - 6,
            totalPages - 5,
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
          ]
        } else {
          pages = [
            1,
            '',
            currentPage - 3,
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,
            currentPage + 3,
            '',
            totalPages
          ]
        }
      }
    }
    setPagesArray(pages)
  }, [])


  return (
    <div>
      <Pagination style={{ justifyContent: "center" }}>
        {pagesArray.map((item, index) => {
          const toReturn = []
          if (index === 0) {
            toReturn.push(
              <Pagination.First
                key="firstpage"
                onClick={
                  currentPage === 1
                    ? () => {}
                    : () => {
                      handlePageChange(1)
                    }
                }
              />
            )

            toReturn.push(
              <Pagination.Prev
                key="prevpage"
                onClick={
                  currentPage === 1
                    ? () => {}
                    : () => {
                      handlePageChange(currentPage - 1)
                    }
                }
              />
            )
          }

          if (item === '') {
            toReturn.push(<Pagination.Ellipsis key={index} />)
          } else {
            toReturn.push(
              <Pagination.Item
                key={index}
                active={currentPage === item}
                onClick={
                  currentPage === item
                    ? () => {}
                    : () => {
                      handlePageChange(item)
                    }
                }
              >
                {item}
              </Pagination.Item>
            )
          }

          if (index === pagesArray.length - 1) {
            toReturn.push(
              <Pagination.Next
                key="nextpage"
                onClick={
                  currentPage === item
                    ? () => {}
                    : () => {
                      handlePageChange(currentPage + 1)
                    }
                }
              />
            )

            toReturn.push(
              <Pagination.Last
                key="lastpage"
                onClick={
                  currentPage === item
                    ? () => {}
                    : () => {
                      handlePageChange(item)
                    }
                }
              />
            )
          }
          return toReturn
        })}
      </Pagination>
    </div>
  )
}

export default Paginate