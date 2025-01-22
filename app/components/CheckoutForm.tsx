"use client";

import { Autocomplete, AutocompleteItem, Form, Input } from "@heroui/react";
import React, { useState, useContext } from "react";
import { AnalyticsContext } from "../providers";

export default function CheckoutForm(props) {
  const { cartData, ...otherProps } = props;
  const [telNumber, setTelNumber] = useState("");
  const analytics = useContext(AnalyticsContext);

  return (
    (<div {...otherProps}>
      <h1>Aizpildiet formu</h1>
      <Form className="w-5/6 md:w-3/4">
        <Input
          onChange={(e) => analytics.inputChange(e)}
          onBlur={() => {
            analytics.sendInput();
          }}
          type="email"
          isRequired
          className="max-w-xs"
          label="Epasts"
        />
        <Input
          onChange={(e) => analytics.inputChange(e)}
          onBlur={() => {
            analytics.sendInput();
          }}
          type="tel"
          isRequired
          maxLength={8}
          startContent="+371"
          isInvalid={React.useMemo(() => {
            if (telNumber === "") return false;
            return ((value) => value.match(/\d{8}/))(telNumber) ? false : true;
          }, [telNumber])}
          onValueChange={setTelNumber}
          errorMessage="Ievadi pareizu telefona numuru"
        ></Input>
        <Input
          onChange={(e) => analytics.inputChange(e)}
          onBlur={() => {
            analytics.sendInput();
          }}
          isRequired
          label="Vārds, uzvārds"
        ></Input>
        <Input
          onChange={(e) => analytics.inputChange(e)}
          onBlur={() => {
            analytics.sendInput();
          }}
          isRequired
          label="Adrese"
        ></Input>
        <Autocomplete 
          onInputChange={(value) => {
            console.log(value)
            analytics.inputChange(value, {
              type: "address_entry",
              source: "AUTOCOMPLETE"
            })
          }}  
          maxListboxHeight={150}
          isRequired
          label="Pakomāts, kurā saņemsiet preci"
          listboxProps={{
            emptyContent: "Pakomāts nav atrasts",
          }}
        >
          {cartData.map((parcelBox, index) => (
            <AutocompleteItem key={index} value={parcelBox}>
              {parcelBox}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </Form>
    </div>)
  );
}
