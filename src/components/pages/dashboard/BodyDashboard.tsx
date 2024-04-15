import { ClientOnly } from "@/components/ClientOnly";
import { CardIncome } from "./CardIncome";
import { CardJobers } from "./CardJobers";
import { CardService } from "./CardServices";
import { CardUserRegister } from "./CardUserRegister";

export function BodyDashboard() {
  return (
    <div className="grid grid-cols-12 gap-8 w-full">
      <ClientOnly>
        <CardService />
      </ClientOnly>

      <ClientOnly>
        <CardJobers />
      </ClientOnly>

      <ClientOnly>
        <CardIncome />
      </ClientOnly>

      <ClientOnly>
        <CardUserRegister />
      </ClientOnly>
    </div>
  );
}
