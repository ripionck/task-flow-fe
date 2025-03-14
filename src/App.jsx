import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import SettingsLayout from './layouts/SettingsLayout';
import AllTasksPage from './pages/AllTasksPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import GetStartedPage from './pages/auth/GetStartedPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import BoardDetailPage from './pages/BoardDetailPage';
import BoardsPage from './pages/BoardsPage';
import CalendarPage from './pages/CalendarPage';
import DashboardPage from './pages/DashboardPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import ReportsPage from './pages/ReportsPage';
import AccountSettingsPage from './pages/settings/AccountSettingsPage';
import AppearanceSettingsPage from './pages/settings/AppearanceSettingsPage';
import LanguageSettingsPage from './pages/settings/LanguageSettingsPage';
import NotificationSettingsPage from './pages/settings/NotificationSettingsPage';
import PasswordSettingsPage from './pages/settings/PasswordSettingsPage';
import SecuritySettingsPage from './pages/settings/SecuritySettingsPage';
import TeamPage from './pages/TeamPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/get-started" element={<GetStartedPage />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />
        </Route>

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/boards/:id" element={<BoardDetailPage />} />
          <Route path="/boards/:id/all-tasks" element={<AllTasksPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/messages" element={<MessagesPage />} />

          {/* Settings routes */}
          <Route path="/settings" element={<SettingsLayout />}>
            <Route
              index
              element={<Navigate to="/settings/account" replace />}
            />
            <Route path="account" element={<AccountSettingsPage />} />
            <Route path="password" element={<PasswordSettingsPage />} />
            <Route
              path="notifications"
              element={<NotificationSettingsPage />}
            />
            <Route path="appearance" element={<AppearanceSettingsPage />} />
            <Route path="security" element={<SecuritySettingsPage />} />
            <Route path="language" element={<LanguageSettingsPage />} />
          </Route>
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
