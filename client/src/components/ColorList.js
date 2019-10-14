import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/AxiosWithAuth'

const initialColor = {
  color: '',
  code: { hex: '' }
}

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false)
  const [colorToEdit, setColorToEdit] = useState(initialColor)
  console.log('color to edit', colorToEdit)
  const editColor = color => {
    setEditing(true)
    setColorToEdit(color)
  }

  const saveEdit = e => {
    e.preventDefault()
    axiosWithAuth()
      // Make a put request to save your updated color
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res)
        console.log(colors)
        setEditing(false)
        updateColors(
          colors.map(color => {
            return color.id === res.data.id ? res.data : color
          })
        )
      })
      .catch(err => console.error(err))
  }

  const deleteColor = color => {
    axiosWithAuth()
      // make a delete request to delete this color
      .delete(`/colors/${color.id}`, colorToEdit)
      .then(res => {
        console.log(color)
        console.log(res)
        updateColors(
          colors.filter(color => {
            return color.id !== res.data
          })
        )
      })
      .catch(err => console.error(err))
  }

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className='delete' onClick={() => deleteColor(color)}>
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className='spacer' />
      {/* stretch - build another form here to add a color */}
      <form>
        <input type='text' placeholder='new color' style={{ outline: 0 }} />
        <input type='text' placeholder='hex code' style={{ outline: 0 }} />
      </form>
    </div>
  )
}

export default ColorList
