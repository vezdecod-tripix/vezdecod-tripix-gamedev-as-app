import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Div, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'

import lever from '../img/lever.svg'
import triangle from '../img/triangle.svg'
import frogImg from '../img/frog.svg'
import catImg from '../img/cat.svg'
import './Balancer.css'

const angles = [40, 30, 20, 10, 0, -10, -20, -30, -40]

const cat = <img
  src={ catImg }
  alt="cat"
/>
const frog = <img
  src={ frogImg }
  alt="frog"
/>

const symbols = '!@.-_'
const digits = '0123456789'
const words = ['cat', 'frog', 'bear', 'fox', 'dog', 'owl']
const year = ['2001', '1996', '1964', '2004', '2006']
const letters = 'abcdefgklmnprstz'
const defaultPassword = 'p@$$w0rd'

const anyFrom = (from) => {
  const max = from.length - 1

  return from[Math.floor(Math.random() * max)]
}

const Balancer = props => {
  const [score, setScore] = useState(0)
  const [password, setPassword] = useState(defaultPassword)
  let copyPassword = password
  const addToStart = (add) => {
    copyPassword = add + copyPassword
    setPassword(copyPassword)
    setAll()
  }
  const addToEnd = (add) => {
    copyPassword = copyPassword + add
    setPassword(copyPassword)
    setAll()
  }
  const addToMiddle = (add) => {
    copyPassword = insertToCenter(copyPassword, anyFrom(letters))
    setPassword(copyPassword)
    setAll()
  }
  const sedPassword = (newPassword) => {
    console.log('sedPassword:', newPassword)
    copyPassword = newPassword
    setPassword(copyPassword)
    setAll()
  }

  const setAll = () => {
    setAdder(additions[Math.floor(Math.random() * (additions.length - 1))])
    setRemover(removers[Math.floor(Math.random() * (removers.length - 1))])
    setSome(calcMemorize(), calcSecurity())
  }
  const calcMemorize = () => {
    let amount = 5

    if (copyPassword.length > 15) {
      amount--;
    }
    if (copyPassword.length > 12) {
      amount--;
    }
    if (copyPassword.length > 8) {
      amount--;
    }
    if ((copyPassword.split(/[!@._-]/)).length > 5) {
      amount--;
    }
    if (copyPassword.match(/\d/)?.length > 6) {
      amount--;
    }

    setMemorize(amount)
    return amount
  }
  const calcSecurity = () => {
    let amount = 5

    if (copyPassword.length < 12) {
      amount--;
    }
    if (copyPassword.length < 8) {
      amount--;
    }
    if (!/[A-Z]/.test(copyPassword)) {
      amount--;
    }
    if (!(copyPassword.match(/[!@._-]/))) {
      amount--;
    }
    if (!(copyPassword.match(/\d/))) {
      amount--;
    }

    setSecurity(amount)
    return amount
  }
  const additions = [
    {
      text: 'Добавить букву в начало', action: () => addToStart(anyFrom(letters))
    },
    { text: 'Добавить букву в конец', action: () => addToEnd(anyFrom(letters)) },
     { text: 'Добавить букву в середину', action: () => addToMiddle(anyFrom(letters)) },
     {
     text: 'Добавить заглавную букву в начало',
     action: () => addToStart(anyFrom(letters).toUpperCase())
     },
     {
     text: 'Добавить заглавную букву в конец',
     action: () => addToEnd(anyFrom(letters).toUpperCase())
     },
     {
     text: 'Добавить заглавную букву в середину',
     action: () => addToMiddle(anyFrom(letters).toUpperCase())
     },
     { text: 'Добавить слово в начало', action: () => addToStart(anyFrom(words)) },
     { text: 'Добавить слово в конец', action: () => addToEnd(anyFrom(words)) },
     { text: 'Добавить слово в середину', action: () => addToMiddle(insertToCenter(anyFrom(words))) },
     { text: 'Добавить цифру в начало', action: () => addToStart(anyFrom(digits)) },
     { text: 'Добавить цифру в конец', action: () => addToEnd(anyFrom(digits)) },
     { text: 'Добавить цифру в середину', action: () => addToMiddle(insertToCenter(anyFrom(digits))) },
     { text: 'Добавить символ в начало', action: () => addToStart(anyFrom(symbols)) },
     { text: 'Добавить символ в конец', action: () => addToEnd(anyFrom(symbols)) },
     { text: 'Добавить символ в середину', action: () => addToMiddle(insertToCenter(anyFrom(symbols))) },
     { text: 'Добавить год в начало', action: () => addToStart(anyFrom(year)) },
     { text: 'Добавить год в конец', action: () => addToEnd(anyFrom(year)) },
     { text: 'Добавить год в середину', action: () => addToMiddle(insertToCenter(anyFrom(year))) }
  ]

  const lose = () => {
    if (props.bestScore < score) {
      localStorage.setItem('worstPasswordsTripixBalancerBestScore', score)
      props.setBestScore(score)
    }
    props.go('home')
  }

  const removers = [
    {
      text: 'Удалить 1 элемента в начале', action: () => {
        sedPassword(copyPassword.slice(-copyPassword.length + 1))
      }
    },
    { text: 'Удалить 2 элемента в начале', action: () => sedPassword(copyPassword.slice(-copyPassword.length + 2)) },
     { text: 'Удалить 3 элемента в начале', action: () => sedPassword(copyPassword.slice(-copyPassword.length + 3)) },
     { text: 'Удалить 4 элемента в начале', action: () => sedPassword(copyPassword.slice(-copyPassword.length + 4)) },
     { text: 'Удалить 1 элемента в конце', action: () => sedPassword(copyPassword.slice(0, copyPassword.length - 1)) },
     { text: 'Удалить 2 элемента в конце', action: () => sedPassword(copyPassword.slice(0, copyPassword.length - 2)) },
     { text: 'Удалить 3 элемента в конце', action: () => sedPassword(copyPassword.slice(0, copyPassword.length - 3)) },
     { text: 'Удалить 4 элемента в конце', action: () => sedPassword(copyPassword.slice(0, copyPassword.length - 4)) },
     { text: 'Удалить все маленькие буквы', action: () => sedPassword(copyPassword.split('').filter((char) => !/[a-z]/.test(char)).join('')) },
     { text: 'Удалить все заглавные буквы', action: () => sedPassword(copyPassword.split('').filter((char) => !/[A-Z]/.test(char)).join('')) },
     { text: 'Удалить все цифры меньше 5', action: () => sedPassword(copyPassword.split('').filter((char) => !/[0-4]/.test(char)).join('')) },
     { text: 'Удалить все цифры больше 4', action: () => sedPassword(copyPassword.split('').filter((char) => !/[5-9]/.test(char)).join('')) },
     { text: 'Удалить все цифры', action: () => sedPassword(copyPassword.split('').filter((char) => !/[0-9]/.test(char)).join('')) },
     { text: 'Удалить все символы', action: () => sedPassword(copyPassword.split('').filter((char) => !/[!@.-_]/.test(char)).join('')) },
  ]
  const [security, setSecurity] = useState(2)
  const [memorize, setMemorize] = useState(2)
  const [angle, setAngle] = useState({ transform: `rotate(${ angles[4 + memorize - security] }deg)` })
  const [cats, setCats] = useState([<img
    src={ catImg }
    alt="cat"
    key="0"
  />, <img
    src={ catImg }
    alt="cat"
    key="1"
  />])
  const [frogs, setFrogs] = useState([<img
    src={ frogImg }
    alt="frog"
    key="0"
  />, <img
    src={ frogImg }
    alt="frog"
    key="1"
  />])
  const [catsStyles, setCatsStyles] = useState({ bottom: `${ (angle - 2) * 10 }px` })
  const [frogsStyles, setFrogsStyles] = useState({ bottom: `${ (angle - 2) * 10 }px` })
  const [adder, setAdder] = useState(additions[Math.floor(Math.random() * (additions.length - 1))])
  const [remover, setRemover] = useState(removers[Math.floor(Math.random() * (removers.length - 1))])

  console.log(Math.floor(Math.random() * (additions.length - 1)))

  const insertToCenter = (string, insert) => {
    return [string.slice(0, Math.ceil((string.length) / 2)), insert, string.slice(-(string.length) / 2)].join('')
  }

  const setSome = (memorize, security) => {
    const some = memorize - security

    setCatsStyles({ bottom: `${ (some) * 10 }px` })
    setFrogsStyles({ bottom: `${ (some) * -10 }px` })
    const newCats = []
    const newFrogs = []
    for (let i = 0; i < security; i++) {
      newCats.push(<img
        src={ catImg }
        alt="cat"
        key={ i }
      />)
    }
    for (let i = 0; i < memorize; i++) {
      newFrogs.push(<img
        src={ frogImg }
        alt="frog"
        key={ i }
      />)
    }
    setFrogs(newFrogs)
    setCats(newCats)
    setAngle({ transform: `rotate(${ angles[4 + some] }deg)` })

    if (Math.abs(some) >= 4) {
      lose()
    } else {
      setScore(score + 1)
    }
  }

  const increaseSecurity = () => {
    const some = 4 + memorize - (security + 1)
    const newCats = []
    setSome(memorize, security + 1)

    for (let i = 0; i < security + 1; i++) {
      newCats.push(<img
        src={ catImg }
        alt="cat"
        key={ i }
      />)
    }

    setCats(newCats)
    setSecurity(security + 1)
    setAngle({ transform: `rotate(${ angles[some] }deg)` })
  }

  const decreaseSecurity = () => {
    const some = 4 + memorize - (security - 1)
    const newCats = []
    setSome(memorize, security - 1)

    for (let i = 0; i < security - 1; i++) {
      newCats.push(<img
        src={ catImg }
        alt="cat"
        key={ i }
      />)
    }

    setCats(newCats)
    setSecurity(security - 1)
    setAngle({ transform: `rotate(${ angles[some] }deg)` })
  }

  const increaseMemorize = () => {
    const some = 4 + (memorize + 1) - security
    const newFrogs = []
    setSome(memorize + 1, security)

    for (let i = 0; i < memorize + 1; i++) {
      newFrogs.push(<img
        src={ frogImg }
        alt="frog"
        key={ i }
      />)
    }

    setFrogs(newFrogs)
    setMemorize(memorize + 1)
    setAngle({ transform: `rotate(${ angles[some] }deg)` })
  }

  const decreaseMemorize = () => {
    const some = 4 + (memorize - 1) - security
    const newFrogs = []
    setSome(memorize - 1, security)

    for (let i = 0; i < memorize - 1; i++) {
      newFrogs.push(<img
        src={ frogImg }
        alt="frog"
        key={ i }
      />)
    }

    setFrogs(newFrogs)
    setMemorize(memorize + 1)
    setAngle({ transform: `rotate(${ angles[some] }deg)` })
  }

  const clickHandler = (_action) => {
    const action = _action
    return () => {
      action()
    }
  }

  return (
    <Panel id={ props.id }>
      <PanelHeader
        left={ <PanelHeaderBack
          onClick={ props.go }
          data-to="home"
        /> }
      >
        Балансер пароля
      </PanelHeader>
      <span>
				Счёт: { score }
			</span>
      <Div className="BalancerPassword">
        { password }
      </Div>
      <Div className="Lever">
        <Div
          className="Cats"
          style={ catsStyles }
        >
          { cats }
        </Div>
        <Div
          className="Frogs"
          style={ frogsStyles }
        >
          { frogs }
        </Div>
        <span>
          <span>{ memorize }</span> : <span>{ security }</span>
        </span>
        <img
          style={ angle }
          className="LeverLever"
          src={ lever }
          alt="lever"
        />
        <img
          className="LeverTriangle"
          src={ triangle }
          alt="triangle"
        />
      </Div>
      <Div className="Actions">
        <Button
          onClick={ adder.action }
          stretched
          size="m"
        >
          { adder ? adder.text : 'error' }
        </Button>
        <Button
          onClick={ remover.action }
          stretched
          size="m"
        >
          { remover ? remover.text : 'error' }
        </Button>
      </Div>
    </Panel>
  )
}

Balancer.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
}

export default Balancer
