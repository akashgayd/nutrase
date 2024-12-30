

import './Header.css'
import logo from '../../aseets/logo.webp';




// import {Link} from 'react-router-dom'

const Header = () => {


  return (
  <>


  <div className='main-header-cont'>

        <div className='header-cont'>  
            
            <div className='logo-img'>
           
            <img src={logo}></img>

            </div>

        <div className='nav-content'>
            <nav className='navbar-link'>     
                <ul className="list-items">

                  <li className="list">
                    <a className='list-link'>Home</a>
                  </li>

                  <li className="list">
                    <a className='list-link'>all course</a>
                  </li>

                  <li className="list">
                    <a className='list-link'>about</a>
                  </li>

                  <li className="list">
                    <a className='list-link'>blog</a>
                  </li>
                </ul>

          </nav>
          </div>
          <div className='LogoutBtn'>

            <button>Logout</button>
          </div>
        </div> 
   </div>

{/* ----------------------- */}

<div className='mob-view'>

      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a className="navbar-brand" href="#">
          
          <div className='logo-img'>
           
           <img src={logo}></img>

           </div></a>

          
        <form className="form-inline my-2 my-lg-0">

        <div className ="logoutBtn">
        <button className="LogBtn " type="submit">Logout</button>
        </div>
        </form>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">allcourse</a>
            </li>
          
            <li className="nav-item">
              <a className="nav-link" href="#">about</a>
            </li>
          

            <li className="nav-item">
              <a className="nav-link" href="#">blog</a>
            </li>
          
          </ul>
          
        </div>
      </nav>
        
                
           
     


</div>
     
  </>

  
  )
}

export default Header;