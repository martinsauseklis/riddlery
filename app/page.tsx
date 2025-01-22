"use client";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@heroui/react";
import { landing, products } from "../dummy_data.json";
import { useContext, useEffect, useState } from "react";
import ProductBrowserModal from "./components/ProductBrowserModal";
import { AnalyticsContext } from "./providers";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [product, setProduct] = useState(products[0]);
  const analytics = useContext(AnalyticsContext);

  useEffect(() => {
    if (analytics) {
      analytics.startPageView(); //Šis tikai rerenderējās vairākas reizes, jo ir Strict Mode
      globalThis.onbeforeunload = () => {
        analytics.endPageView();
      };

      return () => {
        analytics.endPageView();
      };
    }
  }, [analytics]);

  const router = useRouter();

  const changeProduct = () => {
    const dataLength = products.length;
    const randomNumber = Math.floor(Math.random() * dataLength);

    setProduct(products[randomNumber]);
  };

  const navigateToCart = () => {
    router.push(
      `/cart?item=${btoa(encodeURIComponent(JSON.stringify(product)))}`
    );
  };

  return (
    <div className="flex flex-col gap-3 mt-5 h-full md:flex-row md:gap-3 md:ml-5 md:mt-5 md:h-full">
      <div className="flex flex-col w-full md:flex-col md:w-2/5">
        <h1 className="text-3xl text-center font-semibold h-1/3 md:text-4xl md:font-semibold md:h-1/3">
          {landing.heading}
        </h1>
        <ul className="flex flex-col justify-center text-xl list-decimal list-inside ml-8 mt-4 md:flex-col md:justify-center md:text-2xl md:list-decimal md:h-2/3 md:list-inside md:ml-8 ">
          {landing.actionSteps.map((actionStep, index) => (
            <li key={index}>{actionStep}</li>
          ))}
        </ul>
      </div>
      <div className="w-full flex flex-col items-center h-full md:w-3/5 md:flex-col md:items-center md:h-full">
        <Card className="w-5/6 mb-4 flex flex-col">
          <CardHeader className="flex gap-3 justify-center">
            <Image
              alt="product photo"
              radius="sm"
              src={product.image}
              width={500}
              height={500}
              className="object-contain h-[25vh] md:h-[40vh] md:max-h-[400px]"
            />
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col items-center">
            <h2 className="text-lg">{product.title}</h2>
            <p className="text-red-400">
              Vērtība:{" "}
              <span>{parseFloat(product.price).toLocaleString("lv")} €</span>
            </p>
            <p className="text-green-400 font-bold">Noma uz nedēļu: 15,00 €</p>
          </CardBody>
          <Divider />
          <CardFooter className="flex flex-row justify-center">
            <Button
              className="bg-white"
              onPress={(e) => {
                analytics.buttonPress(e);
                changeProduct(e);
                //analytics.capturePress(e)
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Vēlos citu modeli
            </Button>
            <Button
              onPress={(e) => {
                analytics.buttonPress(e);
                navigateToCart();
              }}
            >
              Nomāt
            </Button>
          </CardFooter>
        </Card>
        <ProductBrowserModal setSelected={setProduct} />
      </div>
    </div>
  );
}
