import React from 'react';
import { Routes, Route  } from 'react-router-dom';
import { DealerForm } from '../components/dealerForm/DealerForm';
import { LetterOfIntent } from '../components/letterOfIntent/LetterOfIntent';
import { RequestLetter } from '../components/requestLetter/RequestLetter';
import { DownloadCertificate } from '../components/downloadCertificate/DownloadCertificate';
import { Home } from '../pages/home/Home';
import { AboutUs } from '../pages/aboutUs/AboutUs';
import { Document } from '../components/document/Document';
import { Contact } from '../pages/contactUs/Contact';
import { MissionVision } from '../components/mission&Vision/Mission&Vision';
import { AdminLogin } from '../pages/adminLogin/AdminLogin';
import { Form_22 } from '../components/form_22/Form_22';
import { DisplayActivationCode } from '../components/DisplayActivationCode/DisplayActivationCode';
import { GenerateActivationCode } from '../components/generateActivationCode/GenerateActivationCode';
import { ModifyCNFCode } from '../components/modifyCNFCode/ModifyCNFCode';
import { AdminDash } from '../pages/adminDash/AdminDash';
import  eventBus  from '../components/eventBus/EventBus';
import { CreateProfileSubAdmin } from '../components/createProfileSubAdmin/CreateProfileSubAdmin';
import { CustomerForm } from '../components/customerForm/CustomerForm';
import { DealerCustomerInfo } from '../components/dealerCustomerInfo/DealerCustomerInfo';
import { VehicleInfo } from '../components/vehicleInfo/VehicleInfo';
import { SubAdminLogin } from '../pages/subAdminLogin/SubAdminLogin';
import { SubAdminDash } from '../pages/subAdminDash/SubAdminDash';
import { DealerDash } from '../pages/dealerDash/DealerDash';
import { DealerLogin } from '../pages/dealerLogin/DealerLogin';
import { DisplayCustomerInfo } from '../components/displayCustomerInfo/DisplayCustomerInfo';
import { DisplayVehicleInfo } from '../components/displayVehicleInfo/DisplayVehicleInfo';
import { DealerInfo } from '../components/dealerInfo/DealerInfo';
import { SubAdminInfo } from '../components/subAdminInfo/SubAdminInfo';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' Component={Home} />
            <Route path='/about' Component={AboutUs} />
            <Route path='/LetterOfIntent' Component={LetterOfIntent} />
            <Route path='/RequestLetter' Component={RequestLetter} />
            <Route path='/DownloadCertificate' Component={DownloadCertificate} />
            <Route path='/DealerForm' Component={DealerForm} />
            <Route path='/document' Component={Document} />
            <Route path='/contact' Component={Contact} />
            <Route path='/mission' Component={MissionVision} />
            <Route path='/admin' Component={AdminLogin} />
            <Route path='/form_22' Component={Form_22} />
            <Route path='/displayActivationCode' Component={DisplayActivationCode} />
            <Route path='/generateActivationCode' Component={GenerateActivationCode} />
            <Route path='/modifyCNFCode' Component={ModifyCNFCode} />
            <Route path='/adminDash' Component={AdminDash} />
            <Route path='/eventBus' Component={eventBus} />
            <Route path='/createProfileSubAdmin' Component={CreateProfileSubAdmin} />
            <Route path='/customerForm' Component={CustomerForm} />
            <Route path='/dealerCustomerInfo' Component={DealerCustomerInfo} />
            <Route path='/VehicleInfo' Component={VehicleInfo} />
            <Route path='/subAdminLogin' Component={SubAdminLogin} />
            <Route path='/subAdminDash' Component={SubAdminDash} />
            <Route path='/dealerDash' Component={DealerDash} />
            <Route path='/dealerLogin' Component={DealerLogin} />
            <Route path='/displayCustomerInfo' Component={DisplayCustomerInfo} />
            <Route path='/displayVehicleInfo' Component={DisplayVehicleInfo} />
            <Route path='/dealerInfo' Component={DealerInfo} />
            <Route path='/subAdminInfo' Component={SubAdminInfo} />

        </Routes>
    );
};

export default AppRoutes;