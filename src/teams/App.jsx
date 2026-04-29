import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ZakatCalculator from "./pages/ZakatCalculator";
import ResultPage from "./pages/ResultPage";
import PaymentPage from "./pages/PaymentPage";
import TransferPage from "./pages/TransferPage";
import Dashboard from "./pages/Dashboard";
import UpdateNisabRate from "./pages/UpdateNisabRate";
import "./App.css";
import "./Styles/ZakatCalculator.css";

export default function App() {
  const defaultResult = {
    zakatAmount: 0,
    nisabStatus: "Not calculated",
    method: "-",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [authPage, setAuthPage] = useState("login"); // "login" or "register"
  const [page, setPage] = useState("calculator");
  const [result, setResult] = useState(defaultResult);
  const [payment, setPayment] = useState({
    paymentId: "PAY-2026-001",
    amount: 0,
    gateway: "FPX / Online Banking",
    status: "Pending",
  });
  const [transfer, setTransfer] = useState({
    transferId: "TRF-2026-001",
    bankName: "Maybank",
    zakatOrganization: "Kelantan Zakat Organization",
    status: "Pending",
  });

  useEffect(() => {
    // Check if user is already logged in
    const loggedIn = localStorage.getItem("isLoggedIn");
    const storedRole = localStorage.getItem("userRole");
    if (loggedIn) {
      setIsLoggedIn(true);
      setUserRole(storedRole === "admin" ? "admin" : "user");
      setPage(storedRole === "admin" ? "dashboard" : "calculator");
    }
  }, []);

  useEffect(() => {
    const savedResult = localStorage.getItem("zakat-result");
    if (savedResult) {
      const parsedResult = JSON.parse(savedResult);

      setResult(parsedResult);
      setPayment((prev) => ({
        ...prev,
        amount: parsedResult.zakatAmount || 0,
      }));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("zakat-result", JSON.stringify(result));
    alert("Calculation result saved successfully.");
  };

  const handleLoginSuccess = (role = "user") => {
    setIsLoggedIn(true);
    setUserRole(role);
    setAuthPage("login");
    setPage(role === "admin" ? "dashboard" : "calculator");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);
  };

  const handleRegisterSuccess = () => {
    // Do NOT automatically log in the user after registration
    // User must log in manually with their new credentials
    setIsLoggedIn(false);
    setUserRole("user");
    setAuthPage("login"); // Redirect to login page
    setPage("calculator");
    // Do NOT store anything in localStorage - user needs to log in first
  };

  const handleGoToRegister = () => {
    setAuthPage("register");
  };

  const handleBackToLogin = () => {
    setAuthPage("login");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole("user");
    setPage("calculator");
  };

  const handleAdminGoToDashboard = () => {
    setPage("dashboard");
  };

  const handleAdminGoToNisab = () => {
    setPage("nisab");
  };

  const handleReset = () => {
    localStorage.removeItem("zakat-result");

    setResult({
      zakatAmount: 0,
      nisabStatus: "Not calculated",
      method: "-",
    });

    setPayment({
      paymentId: "PAY-2026-001",
      amount: 0,
      gateway: "FPX / Online Banking",
      status: "Pending",
    });

    setTransfer({
      transferId: "TRF-2026-001",
      bankName: "Maybank",
      zakatOrganization: "Kelantan Zakat Organization",
      status: "Pending",
    });

    setPage("calculator");
    alert("Calculation has been reset.");
  };

  const handleProceedToPayment = () => {
    if (!result || Number(result.zakatAmount) <= 0) {
      alert("Please calculate zakat first before proceeding to payment.");
      return;
    }

    setPayment((prev) => ({
      ...prev,
      amount: Number(result.zakatAmount),
      status: "Pending",
    }));

    setPage("payment");
  };

  const handlePaymentSuccess = () => {
    setPayment((prev) => ({
      ...prev,
      status: "Success",
    }));

    setTransfer((prev) => ({
      ...prev,
      status: "Success",
    }));

    setPage("transfer");
  };

  const handleBackToResult = () => {
    setPage("result");
  };

  const handleCalculatorComplete = (calculatorResult) => {
    const newResult = {
      zakatAmount: Number(calculatorResult.zakat) || 0,
      nisabStatus:
        calculatorResult.total >= calculatorResult.nisab
          ? "Eligible"
          : "Not Eligible",
      method:
        calculatorResult.businessMethod === "UntungRugi"
          ? "Profit & Loss"
          : "Working Capital",
    };

    setResult(newResult);

    setPayment((prev) => ({
      ...prev,
      amount: Number(calculatorResult.zakat) || 0,
      status: "Pending",
    }));

    setTransfer((prev) => ({
      ...prev,
      status: "Pending",
    }));

    setPage("result");
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          {authPage === "login" ? (
            <Login onLoginSuccess={handleLoginSuccess} onGoToRegister={handleGoToRegister} />
          ) : (
            <Register onRegisterSuccess={handleRegisterSuccess} onBackToLogin={handleBackToLogin} />
          )}
        </>
      ) : userRole === "admin" ? (
        <div className="app-shell">
          <div className="app-header-logout">
            <span>👤 {localStorage.getItem("userEmail") || "Admin"}</span>
            <button
              onClick={handleLogout}
              className="logout-btn"
              title="Logout"
            >
              🚪 Logout
            </button>
          </div>

          {page === "dashboard" ? (
            <Dashboard
              currentNisab={{ value: 5247.45, goldPrice: 273.65, year: 2026 }}
              currentNisabUpdatedAt="2 hours ago"
              totalUsers={1524}
              zakatThisYear={42340.5}
              successfulPayments={124}
              pendingPayments={18}
              users={[
                { id: "U001", name: "Amir", email: "amir@example.com", status: "Active", registeredAt: "2026-04-01" },
                { id: "U002", name: "Siti", email: "siti@example.com", status: "Active", registeredAt: "2026-04-03" },
                { id: "U003", name: "Hassan", email: "hassan@example.com", status: "Inactive", registeredAt: "2026-03-28" },
              ]}
              calculations={[
                { id: "C001", name: "Amir", method: "Profit & Loss", amount: 560.75, status: "Completed", createdAt: "2026-04-22" },
                { id: "C002", name: "Siti", method: "Working Capital", amount: 420.25, status: "Pending", createdAt: "2026-04-20" },
              ]}
              payments={[
                { id: "P001", name: "Amir", gateway: "FPX", amount: 560.75, status: "Success", paidAt: "2026-04-22" },
              ]}
              activities={[
                { id: "A001", type: "user", title: "New user registered", subtitle: "A new account was created" },
                { id: "A002", type: "calc", title: "Nisab calculation done", subtitle: "A new zakat calculation completed" },
                { id: "A003", type: "success", title: "Payment approved", subtitle: "Payment successfully processed" },
              ]}
              onGoNisab={handleAdminGoToNisab}
            />
          ) : (
            <UpdateNisabRate
              data={{ year: 2026, goldPrice: 273.65, nisabValue: 5247.45 }}
              history={[
                { id: 1, effectiveDate: "2026-04-01", goldPrice: 270.0, nisabValue: 5200.0, status: "Active", updatedBy: "Admin", active: true },
                { id: 2, effectiveDate: "2026-01-15", goldPrice: 265.0, nisabValue: 5100.0, status: "Inactive", updatedBy: "Admin", active: false },
              ]}
              onUpdate={() => {}}
              onDelete={() => {}}
              onGoDashboard={handleAdminGoToDashboard}
              onGoNisab={handleAdminGoToNisab}
              onGoManageData={() => {}}
            />
          )}
        </div>
      ) : (
        <div className="app-shell">
          <div className="app-header-logout">
            <span>👤 {localStorage.getItem("userEmail") || "User"}</span>
            <button 
              onClick={handleLogout}
              className="logout-btn"
              title="Logout"
            >
              🚪 Logout
            </button>
          </div>

          {page === "calculator" && (
            <ZakatCalculator onComplete={handleCalculatorComplete} />
          )}

          {page === "result" && (
            <ResultPage
              result={result}
              onSave={handleSave}
              onReset={handleReset}
              onProceed={handleProceedToPayment}
            />
          )}

          {page === "payment" && (
            <PaymentPage
              payment={payment}
              onPay={handlePaymentSuccess}
              onBack={handleBackToResult}
            />
          )}

          {page === "transfer" && (
            <TransferPage transfer={transfer} onBack={handleBackToResult} />
          )}
        </div>
      )}
    </>
  );
}