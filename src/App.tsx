import Contacts from './components/Contact/Contacts';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Modal from './components/Modal/Modal';
import NewContact from './components/NewContact/NewContact';
import EditContact from './components/EditContact/EditContact';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Contacts/>}/>
        <Route path="/new-contact" element={<NewContact/>}/>
        <Route path="/edit-contact/:id" element={<EditContact/>}/>
      </Routes>
      <Modal/>
    </Layout>
  );
}

export default App;
