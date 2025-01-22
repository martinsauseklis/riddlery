"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState, useContext } from "react";
import PaymentPicker from "../components/PaymentPicker";
import CheckoutForm from "../components/CheckoutForm";
import CartContent from "../components/CartContent";
import { cart } from "../../dummy_data.json";
import { AnalyticsContext } from "../providers";

export default function Cart() {
  const cartData = useState(cart.parcelBoxes)[0];

  const analytics = useContext(AnalyticsContext);

  useEffect(() => {
    if (analytics) {
      analytics?.startPageView(); 
      globalThis.onbeforeunload = () => {
        analytics.endPageView();
      };

      return () => {
        analytics.endPageView();
      };
    }
  }, [analytics]);

  const memoizedCartData = useMemo(() => {
    return cartData.map(
      (parcelBox) =>
        `OMNIVA - ${parcelBox.NAME}, ${parcelBox.A5_NAME} ${parcelBox.A7_NAME}, LV-${parcelBox.ZIP}`
    );
  }, [cartData]);
  const router = useRouter();
  return (
    <div className="flex flex-col md:ml-2 md:mt-2 md:mr-2 md:flex-row md:gap-10">
      <Button
        className="mt-2 w-1/3 md:hidden"
        onPress={(e) => {
          analytics.buttonPress(e);
          router.back();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="undefined"
        >
          <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
        Atpakaļ
      </Button>
      <div className="flex flex-col w-full md:w-1/2">
        <CheckoutForm
          className="flex flex-col items-center md:block md:ml-3"
          cartData={memoizedCartData}
        />
        <Button
          className="hidden md:block md:mt-5 md:w-7"
          onPress={(e) => {
            analytics.buttonPress(e);
            router.back();
          }}
        >
          Atpakaļ
        </Button>
      </div>
      <div className="w-full flex flex-col md:w-1/2">
        <CartContent className="flex flex-col items-center w-full md:block" />
        <PaymentPicker className="flex flex-col items-center w-full md:block" />
      </div>
    </div>
  );
}
