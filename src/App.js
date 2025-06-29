import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import HomeScreen from './screens/HomeScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';


function App() {
  return (

    <main>
      <Header />
      <Container>
        <Routes >

          <Route path='/' Component={HomeScreen} exact> </Route>
          <Route path='/login' Component={LoginScreen} exact> </Route>
          <Route path='/register' Component={RegisterScreen} exact> </Route>
          <Route path='/product/:id' Component={ProductScreen}> </Route>
          <Route path='/cart/:id?' Component={CartScreen}></Route>
          <Route path='/profile' Component={ProfileScreen}></Route>
          <Route path='/shipping' Component={ShippingScreen}></Route>
          <Route path='/payment' Component={PaymentScreen}></Route>
          <Route path='/placeorder' Component={PlaceOrderScreen}></Route>
          {/* <Route path='/order' Component={HomeScreen}></Route> */}

        </Routes>
      </Container>
      <Footer />
    </main>

  );
}

export default App;
