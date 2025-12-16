import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import SignUp from "@/auth/components/SignUp";
import SignIn from "@/auth/components/SignIn";
import { LandingPage }  from "@/index"; 
import {InvoiceForm}   from "./invoice-gen/components/InvoiceForm";
import Pricing from "./pricing/components/Pricing";
import ClientManagement from "./invoice-gen/components/ClientManagement";
import FinancialReportingPage from "./invoice-gen/components/FinancialReporting";
import InvoiceDetails from "./invoice-gen/components/InvoiceDetails";
import axious from 'axios';


axious.defaults.baseURL = 'http://localhost:8000'
axious.defaults.withCredentials = true

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />}/>
        <Route path="/dashboard" element={<LandingPage />}/>
        <Route path="/invoiceForm" element={<InvoiceForm />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/clientManagement" element={<ClientManagement />} />
        <Route path="/financialReporting" element={<FinancialReportingPage />} />
        <Route path="/invoice/:id" element={<InvoiceDetails />} />
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
      </Layout>
    </BrowserRouter>
  );
};
