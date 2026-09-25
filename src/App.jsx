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
import SupportModal from './components/SupportModal';

// Initial mock data if empty
const INITIAL_REQUESTS = [
  {
    id: 'req-1',
    email: 'ph645475@gmail.com',
    orderId: '909090',
    reason: 'Produto não funcionou como esperado',
    details: 'Instalei a integração mas não sincronizou o estoque adequadamente.',
    timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    status: 'Em Análise'
  },
  {
    id: 'req-2',
    email: 'cliente.antonio@gmail.com',
    orderId: 'TRD-2024-0089',
    reason: 'Comprei por engano',
    details: 'Realizei a compra da licença errada no checkout.',
    timestamp: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
    status: 'Aprovado'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('wizard');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    orderId: '',
    reason: '',
    details: ''
  });

  // Local Storage for Requests
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('forneceup_reimbursements');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [activeRequest, setActiveRequest] = useState(null);

  useEffect(() => {
    localStorage.setItem('forneceup_reimbursements', JSON.stringify(requests));
  }, [requests]);

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
  const handleSubmitRefund = () => {
    const newReq = {
      id: `req-${Date.now()}`,
      email: formData.email,
      orderId: formData.orderId,
      reason: formData.reason,
      details: formData.details,
      timestamp: new Date().toISOString(),
      status: 'Em Análise'
    };

    setRequests([newReq, ...requests]);
    setActiveRequest(newReq);
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

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 flex flex-col font-sans relative selection:bg-amber-300 selection:text-black">
      {/* Background radial glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[300px] bg-amber-400/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[300px] bg-yellow-300/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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
      </main>

      {/* Floating 72h SLA Timer Badge */}
      {(currentStep === 4 || activeRequest) && (
        <SlaTimer startTime={activeRequest?.timestamp || new Date().toISOString()} />
      )}

      {/* Direct Support Modal displaying email forneceupsuporte@gmail.com */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </div>
  );
}
