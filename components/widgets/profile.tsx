import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Widget from "./widget";

export function PureProfile({ dropRef }: { dropRef: React.RefObject<HTMLDivElement> }) {
  return (
    <>
      <Avatar>
        <AvatarImage src="https://picsum.photos/100/100/1" />
        <AvatarFallback>Hi</AvatarFallback>
      </Avatar>
      <div ref={dropRef} className="flex flex-col">
        <p className="text-sm font-medium">John Doe</p>
        <p className="text-xs text-muted-foreground">john.doe@example.com</p>
      </div>
    </>
  );
}

export default function Profile() {
  const profileProps = { identifier: "프로필" };
  return <Widget component={PureProfile} componentProps={profileProps} />;
}
