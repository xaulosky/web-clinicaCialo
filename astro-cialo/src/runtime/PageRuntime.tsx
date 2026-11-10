import { Suspense, useEffect, useState, type ReactNode } from "react";
import { NavigationProvider } from "../shims/next-navigation";
import { ToastProvider } from "@/app/components/Toast";
import CartSlider from "@/app/components/CartSlider";
import MothersDayPromoModal from "@/app/components/MothersDayPromoModal";
import MothersDayFloatingButton from "@/app/components/MothersDayFloatingButton";
import CyberPromoModal from "@/app/components/CyberPromoModal";
import BlackFridayPopup from "@/app/components/BlackFridayPopup";
import VambeChat from "@/app/components/VambeChat";

function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? children : null;
}

export function PageRuntime({
  pathname,
  search = "",
  children
}: {
  pathname: string;
  search?: string;
  children: ReactNode;
}) {
  return (
    <NavigationProvider pathname={pathname} search={search}>
      <ToastProvider>
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
          {children}
        </Suspense>
        <MothersDayPromoModal />
        <MothersDayFloatingButton />
        <CyberPromoModal />
        <BlackFridayPopup />
        <ClientOnly>
          <CartSlider />
        </ClientOnly>
      </ToastProvider>
      <VambeChat />
    </NavigationProvider>
  );
}
