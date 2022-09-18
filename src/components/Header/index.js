import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="site-logo-image"
        />
      </Link>
      <ul className="small-header-icons-container">
        <Link to="/">
          <li>
            <AiFillHome className="home-icon" />
          </li>
        </Link>

        <Link to="/jobs">
          <li>
            <BsFillBriefcaseFill className="home-icon" />
          </li>
        </Link>
        <li>
          <button
            type="button"
            onClick={onClickLogout}
            className="logout-icon-button"
          >
            <FiLogOut className="home-icon" />
          </button>
        </li>
      </ul>

      <ul className="nav-items-container">
        <Link to="/">
          <li className="nav-item">Home</li>
        </Link>

        <Link to="/jobs">
          <li className="nav-item">Jobs</li>
        </Link>
      </ul>

      <button onClick={onClickLogout} className="logout-button">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
