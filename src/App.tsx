import Router from "./router";
import PWAInstallPrompt from "./components/common/PWAInstallPrompt";
import OfflineIndicator from "./components/common/OfflineIndicator";

function App() {
  return (
    <>
      <OfflineIndicator />
      <Router />
      <PWAInstallPrompt />
    </>
  );
}

export default App;
