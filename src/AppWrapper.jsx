import { AppServiceProvider } from "@/context/AppServiceContext"
import App from "./App"

export default function AppWrapper() {
  return (
    <AppServiceProvider>
      <App />
    </AppServiceProvider>
  );
}
