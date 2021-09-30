import React from 'react'
import PropTypes from 'prop-types'

const EditCategories = ({ categories }) => {
  console.log('categories EditCategories: ', categories)
  if (categories && categories.length > 0) {
    return (
      <>
        <h1>Edit categories</h1>
        <ul>
          {categories.map((category, index) => {
            return <li key={index}>{category}</li>
          })}
        </ul>
      </>
    )
  }
  return (
    <>
      <h1>Loading categories</h1>
    </>
  )
}

export default EditCategories

EditCategories.defaultProps = {
  categories: [],
}

EditCategories.propTypes = {
  categories: PropTypes.array,
}
