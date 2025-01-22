import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  RadioGroup,
  ScrollShadow,
} from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import CustomRadio from "./CustomRadio";
import data from "../../dummy_data.json";
import Image from "next/image";
import { AnalyticsContext } from "../providers";

export default function ProductBrowserModal(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const products = useState(data.products)[0];
  const [filteredProducts, setFilteredProducts] = useState(
    products
  );
  const [selected, setSelected] = useState("");

  const analytics = useContext(AnalyticsContext);

  const filterProducts = (e) => {
    const filtered = products.filter((product) =>
      product.title
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    );

    if (filtered.length > 0) {
      setSelected(filtered[0].value);
      setFilteredProducts(filtered);
    } else {
      setSelected("");
      setFilteredProducts(null);
    }
  };

  useEffect(() => {
    if(isOpen) {
      setFilteredProducts(data.products);
      setSelected("");
    }

  }, [isOpen]);

  return (
    <>
      <Button
        onPress={(e) => {
          onOpen();
          analytics.modalOpen(e);
        }}
      >
        Pārlūkot modeļus
      </Button>
      <Modal
      isDismissable={false}
      hideCloseButton
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
        }}
        size="2xl"
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <Input
                  placeholder="Ievadi modeļa nosaukumu"
                  onChange={(e) => {
                    filterProducts(e);
                    analytics.inputChange(e);
                  }}
                  onBlur={() => {
                    analytics.sendInput();
                  }}
                />
              </ModalHeader>
              <ModalBody>
                {filteredProducts && (
                  <RadioGroup
                    value={selected}
                    onValueChange={(e) => {
                      setSelected(e);
                      analytics.setSelected(e);
                    }}
                  >
                    <ScrollShadow className="h-[45vh]" hideScrollBar={true}>
                      {filteredProducts.map((product) => (
                        <CustomRadio
                          key={product.value}
                          value={product.value}
                          className="w-1/3"
                        >
                          <Image
                            alt={product.title}
                            src={product.image}
                            height={0}
                            width={1000}
                            className="h-[200px] object-contain"
                          />
                          <p>{product.title}</p>
                        </CustomRadio>
                      ))}
                    </ScrollShadow>
                  </RadioGroup>
                )}
                {!filteredProducts && <h2>Prece nav atrasta</h2>}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={(e) => {
                    onClose();
                    analytics.modalClose(e);
                  }}
                >
                  Aizvērt
                </Button>
                {selected && (
                  <Button
                    color="primary"
                    onPress={(e) => {
                      onClose();
                      const selectedProduct = filteredProducts.find(
                        (product) => product.value == selected
                      );
                      props.setSelected(selectedProduct);
                      analytics.modalClose(e);
                    }}
                  >
                    Izvēlēties{" "}
                    {
                      filteredProducts.find(
                        (product) => product.value == selected
                      ).title
                    }
                  </Button>
                )}
                {!selected && (
                  <Button
                    isDisabled
                    color="primary"
                    onPress={(e) => {
                      setCloseEvents(e)
                      onClose();
                      analytics.modalClose(e);
                    }}
                  >
                    Izvēlies preci
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
