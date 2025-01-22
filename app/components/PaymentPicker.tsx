import CustomRadioGroup from "./CustomRadioGroup";
import Image from "next/image";
import CustomRadio from "./CustomRadio";
import gpayLogo from "../assets/gpay.svg";
import applepayLogo from "../assets/applepay.svg";
import { CiCreditCard1 } from "react-icons/ci";
import { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { CircularProgress } from "@heroui/react";
import { AnalyticsContext } from "../providers";

export default function PaymentPicker() {
  
  const defaultProps = {
    "aria-label": "Savienojam ar maksājuma sistēmu...",
    label: "Savienojam ar maksājuma sistēmu...",
    size: "lg",
  };

  const [value, setValue] = useState("");
  const [currentProps, setCurrentProps] = useState(defaultProps);
  const [circularVisible, setCircularVisible] = useState(true);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const analytics = useContext(AnalyticsContext);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setCurrentProps({
          "aria-label": "Savienojums neizdevās, mēģiniet vēlāk!",
          label: "Savienojums neizdevās, mēģiniet vēlāk!",
          size: "lg",
        });
        setCircularVisible(false);
      }, Math.floor(Math.random() * 7001));

      return () => clearTimeout(timeout);
    } else {
      setCurrentProps(defaultProps);
      setCircularVisible(true);
      setValue("");
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setCurrentProps(defaultProps);
    setCircularVisible(true);
    setValue("");
  };

  return (
    <div className="w-full">
      <CustomRadioGroup
        value={value}
        onValueChange={(e) => {
          analytics.setSelected(e);
          setValue(e);
          onOpen();
        }}
        label="Izvēlies maksājuma veidu: "
      >
        <div className="flex flex-row w-full md:scale-80 md:w-4/5">
          <CustomRadio
            value="googlepay"
            className="flex h-[4rem] justify-center items-center"
          >
            <Image
              src={gpayLogo}
              alt="Google Pay"
              style={{ maxHeight: "2rem" }}
            />
          </CustomRadio>
          <CustomRadio
            value="applepay"
            className="flex h-[4rem] justify-center items-center"
          >
            <Image
              src={applepayLogo}
              alt="Apple Pay"
              style={{ maxHeight: "2rem" }}
            />
          </CustomRadio>
          <CustomRadio
            value="debit"
            className="flex h-[4rem] justify-center items-center"
          >
            <div className="flex flex-col items-center align-middle h-full">
              <CiCreditCard1 size={30} />
              <p className="block text-sm text-nowrap">Maksājumu karte</p>
            </div>
          </CustomRadio>
        </div>
      </CustomRadioGroup>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Maksājums ar{" "}
                {value == "debit"
                  ? "karti"
                  : value == "googlepay"
                  ? "Google Pay"
                  : "Apple Pay"}
              </ModalHeader>
              <ModalBody>
                {circularVisible && <CircularProgress {...currentProps} />}
                {!circularVisible && (
                  <h2>Savienojums neizdevās, mēģiniet vēlāk!</h2>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  Aizvērt
                </Button>
                <Button isDisabled color="primary" onPress={handleClose}>
                  Turpināt
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
