import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserProvider } from './userContext';
import { Container } from 'react-bootstrap';
import AppNavbar from './Components/AppNavbar';
import Footer from './Components/Footer';
import AppSidebar from './Components/AppSidebar';
import Home from './Pages/Home';
import PageNotFound from './Pages/PageNotFound';
import Login from './Pages/Login';
import LoginNavbar from './Components/LoginNavbar';
import Logout from './Pages/Logout';
import LoaderOne from './Components/Subcomponents/loader/LoaderOne'
import FormsRepository from './Pages/FormsRepository';
import Wiki from './Pages/Wiki';
import AppQuickLinksBar from './Components/AppQuickLinksBar';
import ComposeArticle from './Pages/ComposeArticle'
import ArticleViewer from './Pages/ArticleViewer';

function App() {

    const [isInCompose, setIsInCompose] = useState(false)
    const [isInArticleView, setIsInArticleView] = useState(false)
    const [isUserHovered, setIsUserHovered] = useState(true)
    const [isDoneInitializing, setIsDoneInitialing] = useState(false);
    const [user, setUser] = useState({
        id: null,
        firstName: null,
        lastName: null,
        jobTitle: null,
        isManager: null
    });

    const unsetUser = () => {
        localStorage.clear();
    }

    useEffect(() => {
  
        fetch(`${process.env.REACT_APP_API_URL}/api/users/user/detail`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        .then(res => res.json())
        .then(data => {

            data = data.result
            if(typeof data !== "undefined"){

                setUser({
                    id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    jobTitle: data.jobTitle,
                    isManager: data.isManager
                })

                setIsDoneInitialing(true);
                
            } else {
                setUser({
                    id: null,
                    firstName: null,
                    lastName: null,
                    jobTitle: null,
                    isManager: null
                })

                setIsDoneInitialing(true);
            }   
        })
        
    }, [user.id])

    return (
        
        <UserProvider value={{user, setUser, unsetUser}}>
            <Router>
                <Container fluid className=''>
                    {isDoneInitializing?
                    <div className='row' >
                        <div className='col-12 sticky-top pr-0 pl-0 navbar-min-height'>
                            {user.id == null ?
                            <LoginNavbar />
                            :
                            <>
                            <AppNavbar setIsUserHovered={setIsUserHovered} setIsInCompose={setIsInCompose} setIsInArticleView={setIsInArticleView}/>
                            {isUserHovered? 
                            <></>
                            :
                            <></>
                            }
                            
                            </>
                            }
                            
                        </div>
                        {user.id == null? <Login /> 
                        :
                        isInCompose ? <ComposeArticle /> :
                        
                        <>
                        {isInArticleView ? 
                        <Routes>
                            <Route path='/article/:articleId' element={<ArticleViewer/>} />
                        </Routes>
                        :
                        <>
                        <div className='col-3 mt-3 ml-5'>
                            <AppSidebar />
                        </div>
                        <div className='col-6 mt-4 mb-4 mr-auto pl-0 main-content'>
                            <div className='p-3' style={{}}>
                                <Routes>
                                    <Route path="/" element={<Home/>} />
                                    <Route path='/forms-repository' element={<FormsRepository/>} />
                                    <Route path='/wiki' element={<Wiki/>} />
                                    <Route path='/login' element={<Login />} />
                                    <Route path='/logout' element={<Logout />} />
                                    <Route path="*" element={<PageNotFound />} />
                                </Routes> 
                            </div>
                        </div>
                        <div className='col-1 mr-auto'>
                            <AppQuickLinksBar/>
                        </div>
                        </>
                        }
                        </>
                        }
                        <div className='col-12 pr-0 pl-0'>
                            <Footer />
                        </div>
                    </div>
                    
                    :
                    <>
                    <div className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
                        <LoaderOne />
                    </div>
                    </>
                    }
                    
                </Container>
            </Router>
        </UserProvider>
    );
}

export default App;
