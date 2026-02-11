import React, { useState, useCallback } from 'react';
import AuthProvider, { useAuth } from './providers/AuthProvider';
import ToastProvider from './providers/ToastProvider';
import Navigation from './components/Navigation';

// Pages
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ClientDashboard from './pages/ClientDashboard';
import BankAccountsPage from './pages/BankAccountsPage';
import DepositsPage from './pages/DepositsPage';
import DepositDetailPage from './pages/DepositDetailPage';
import CardsPage from './pages/CardsPage';
import SettingsPage from './pages/SettingsPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminClients from './pages/AdminClients';
import AdminClientDetail from './pages/AdminClientDetail';
import AdminDeposits from './pages/AdminDeposits';
import AdminCards from './pages/AdminCards';
import AdminWebhooks from './pages/AdminWebhooks';
import AdminOperations from './pages/AdminOperations';
import AdminSettings from './pages/AdminSettings';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <PageRouter />
      </AuthProvider>
    </ToastProvider>
  );
}

function PageRouter() {
  const { isAuthenticated, isAdmin } = useAuth();
  const [page, setPage] = useState('landing');
  const [pageParams, setPageParams] = useState({});

  const navigate = useCallback((target, params = {}) => {
    setPage(target);
    setPageParams(params);
    window.scrollTo(0, 0);
  }, []);

  // If authenticated but on a public page, redirect to appropriate dashboard
  if (isAuthenticated && ['landing', 'signup', 'signin'].includes(page)) {
    // Use a timeout-free approach: just render the right page
    const defaultPage = isAdmin ? 'admin-dashboard' : 'dashboard';
    if (page !== defaultPage) {
      // Redirect on next render
      setTimeout(() => navigate(defaultPage), 0);
    }
  }

  // If not authenticated, only show public pages
  if (!isAuthenticated) {
    switch (page) {
      case 'signup':
        return <SignUpPage onNavigate={navigate} />;
      case 'signin':
        return <SignInPage onNavigate={navigate} />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  }

  // Authenticated: show nav + page
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={page} onNavigate={navigate} />
      <main>
        {renderPage(page, pageParams, navigate, isAdmin)}
      </main>
    </div>
  );
}

function renderPage(page, params, navigate, isAdmin) {
  // Client pages
  switch (page) {
    case 'dashboard':
      return <ClientDashboard onNavigate={navigate} />;
    case 'bank-accounts':
      return <BankAccountsPage />;
    case 'deposits':
      return <DepositsPage onNavigate={navigate} />;
    case 'deposit-detail':
      return <DepositDetailPage depositId={params.depositId} onNavigate={navigate} />;
    case 'cards':
      return <CardsPage />;
    case 'settings':
      return <SettingsPage />;

    // Admin pages
    case 'admin-dashboard':
      return <AdminDashboard onNavigate={navigate} />;
    case 'admin-clients':
      return <AdminClients onNavigate={navigate} />;
    case 'admin-client-detail':
      return <AdminClientDetail clientId={params.clientId} onNavigate={navigate} />;
    case 'admin-deposits':
      return <AdminDeposits />;
    case 'admin-cards':
      return <AdminCards />;
    case 'admin-webhooks':
      return <AdminWebhooks />;
    case 'admin-operations':
      return <AdminOperations />;
    case 'admin-settings':
      return <AdminSettings />;

    default:
      return isAdmin ? <AdminDashboard onNavigate={navigate} /> : <ClientDashboard onNavigate={navigate} />;
  }
}
