import { AppServiceProvider } from "@/context/AppServiceContext"
import { ModalProvider } from "@/context/ModalContext"
import App from "./App"

export default function AppWrapper() {
  return (
    <AppServiceProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AppServiceProvider>
  );
}
