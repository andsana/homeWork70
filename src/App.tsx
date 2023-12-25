import ContactForm from './components/ContactForm/ContactForm';
import Contacts from './components/Contact/Contacts';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Modal from './components/Modal/Modal';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Contacts/>}/>
        <Route path="/new-contact" element={<ContactForm/>}/>
      </Routes>
      <Modal/>
    </Layout>
  );
}

export default App;
