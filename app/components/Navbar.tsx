import Image from "next/image";
import Logo from "../assets/logo.svg";

export default function Navbar({ ...props }) {
  return (
    <div
      className={`${props.className} bg-black h-12 flex justify-between text-background`}
    >
      <Image src={Logo} alt="Riddlery logo" className="w-fit ml-2" />
    </div>
  );
}
