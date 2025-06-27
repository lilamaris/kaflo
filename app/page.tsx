import Logo from "@/public/logo.svg";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Image src={Logo} alt="logo" />
    </div>
  );
}
