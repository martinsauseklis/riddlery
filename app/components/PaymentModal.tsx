import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { CircularProgress } from "@heroui/progress";
import { useEffect, useState } from "react";


export default function PaymentModal(props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const defaultProps = {
    "aria-label": "Savienojam ar maksājuma sistēmu...",
    label: "Savienojam ar maksājuma sistēmu...",
    size: "lg",
  };

  const [currentProps, setCurrentProps] = useState(defaultProps);
  const [circularVisible, setCircularVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentProps({
        "aria-label": "Savienojums neizdevās, mēģiniet vēlāk!",
        label: "Savienojums neizdevās, mēģiniet vēlāk!",
        size: "lg",
      });
      setCircularVisible(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setCurrentProps(defaultProps);
    setCircularVisible(true);
    props.showModal[1](false);
  };

  useEffect(() => {
    if (props.showModal[0]) {
      onOpen();
    }
  }, [props.showModal[0]]);

  return (
    <>
      {/* <Button onPress={onOpen}>Veikt apmaksu</Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                {circularVisible && <CircularProgress {...currentProps} />}
                {!circularVisible && (
                  <h2>Savienojums neizdevās, mēģiniet vēlāk!</h2>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
