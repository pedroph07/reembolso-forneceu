import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import SidebarSteps from './components/SidebarSteps';
import StepIdentification from './components/steps/StepIdentification';
import StepReason from './components/steps/StepReason';
import StepConfirmation from './components/steps/StepConfirmation';
import StepProcessing from './components/steps/StepProcessing';
import SlaTimer from './components/SlaTimer';
import TermsOfService from './components/TermsOfService';
import AdminDashboard from './components/AdminDashboard';
import SupportModal from './components/SupportModal';
import { 
  getReimbursements, 
  addReimbursement, 
  updateReimbursementStatus, 
  isSupabaseConfigured 
} from './lib/supabase';

export default function App() {
  const [activeTab, setActiveTab] = useState('wizard'); // 'wizard' | 'terms' | 'admin'
  const [currentStep, setCurrentStep] = useState(1);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    orderId: '',
    reason: '',
    details: ''
  });

  // Requests state
  const [requests, setRequests] = useState([]);
  const [activeRequest, setActiveRequest] = useState(null);

  // Fetch requests on mount
  useEffect(() => {
    getReimbursements().then(data => setRequests(data));
  }, []);

  // Sync to localStorage as backup
  useEffect(() => {
    if (requests.length > 0) {
      localStorage.setItem('forneceup_reimbursements', JSON.stringify(requests));
    }
  }, [requests]);

  // Check URL slug for /ph01 access
  useEffect(() => {
    const checkSlug = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path === '/ph01' || search.includes('ph01') || hash === '#ph01') {
        setActiveTab('admin');
      }
    };

    checkSlug();
    window.addEventListener('popstate', checkSlug);
    return () => window.removeEventListener('popstate', checkSlug);
  }, []);

  // Handle Step Advancement
  const handleNextStep = (nextStep, foundRequest = null) => {
    if (foundRequest) {
      setActiveRequest(foundRequest);
      setFormData({
        email: foundRequest.email,
        orderId: foundRequest.orderId,
        reason: foundRequest.reason,
        details: foundRequest.details || ''
      });
      setCurrentStep(4);
      return;
    }
    setCurrentStep(nextStep);
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Final Submission
  const handleSubmitRefund = async () => {
    const rawReq = {
      id: `req-${Date.now()}`,
      email: formData.email,
      orderId: formData.orderId,
      reason: formData.reason,
      details: formData.details,
      timestamp: new Date().toISOString(),
      status: 'Em Análise'
    };

    // Save to Supabase / LocalStorage
    const savedRecord = await addReimbursement(rawReq);

    setRequests(prev => [savedRecord, ...prev]);
    setActiveRequest(savedRecord);
    setCurrentStep(4);

    // Launch celebratory confetti in gold/yellow
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FCD34D', '#10B981', '#FFFFFF']
    });
  };

  const resetForm = () => {
    setFormData({ email: '', orderId: '', reason: '', details: '' });
    setActiveRequest(null);
    setCurrentStep(1);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    await updateReimbursementStatus(id, newStatus);
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    if (activeRequest && activeRequest.id === id) {
      setActiveRequest(prev => ({ ...prev, status: newStatus }));
    }
  };

  const clearAllRequests = () => {
    localStorage.removeItem('forneceup_reimbursements');
    getReimbursements().then(data => setRequests(data));
    resetForm();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 flex flex-col font-sans relative selection:bg-amber-300 selection:text-black">
      {/* Background radial glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[300px] bg-amber-400/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[300px] bg-yellow-300/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'wizard') window.history.pushState({}, '', '/');
          else if (tab === 'terms') window.history.pushState({}, '', '/termos');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-24 pt-4">
        {activeTab === 'wizard' && (
          <div className="w-full max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-8">
            {/* Sidebar with Step Progress & Customer Info */}
            <SidebarSteps
              currentStep={currentStep}
              setStep={(s) => setCurrentStep(s)}
              formData={formData}
              resetForm={resetForm}
              openSupportModal={() => setIsSupportOpen(true)}
            />

            {/* Step Wizard Container */}
            <div className="flex-1">
              {currentStep === 1 && (
                <StepIdentification
                  formData={formData}
                  setFormData={setFormData}
                  onNext={handleNextStep}
                  existingRequests={requests}
                />
              )}

              {currentStep === 2 && (
                <StepReason
                  formData={formData}
                  setFormData={setFormData}
                  onNext={handleNextStep}
                  onBack={handleBackStep}
                />
              )}

              {currentStep === 3 && (
                <StepConfirmation
                  formData={formData}
                  onSubmit={handleSubmitRefund}
                  onBack={handleBackStep}
                  onOpenTerms={() => setActiveTab('terms')}
                />
              )}

              {currentStep === 4 && (
                <StepProcessing
                  currentRequest={activeRequest}
                  onReset={resetForm}
                  onOpenTerms={() => setActiveTab('terms')}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'terms' && (
          <TermsOfService openSupportModal={() => setIsSupportOpen(true)} />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            requests={requests}
            updateStatus={handleStatusUpdate}
            clearAllRequests={clearAllRequests}
            isSupabase={isSupabaseConfigured}
          />
        )}
      </main>

      {/* Floating SLA Timer Badge */}
      {(currentStep === 4 || activeRequest) && (
        <SlaTimer startTime={activeRequest?.timestamp || new Date().toISOString()} />
      )}

      {/* Direct Support Modal */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </div>
  );
}
