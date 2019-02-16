import React from 'react'

export default class Modal extends React.Component {
  render() {
    return (
      <div className='modal'>
        <form>
            <input type='file' name='changeAvatar' ></input>
            <button>Готово</button>
            <button>Отменить</button>
        </form>
      </div>
    )
  }
}
