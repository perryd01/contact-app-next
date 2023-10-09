import Link from "next/link";
import Button from "../Button";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid grid-cols-3"
      style={{
        gridTemplateColumns: "1fr max-content 1fr",
      }}
    >
      <div className="h-24 border-r-[1px] border-grey-60"></div>
      <div className="h-2"></div>
      <div className="h-24 border-l-[1px] border-grey-60"></div>
      {/* second row */}
      <div className="flex flex-row justify-end items-center p-6 border-y-[1px] border-grey-60">
        <Button icon="Back arrow" variant="secondary" />
      </div>
      <div className="p-6 flex flex-row justify-between px-6 border-[1px] border-grey-60">
        <h1>Contacts</h1>
        <div className="flex flex-row gap-6">
          <div className="flex flex-row gap-2">
            <Button icon="Search" variant="secondary" />
            <Button icon="More" variant="secondary" />
          </div>
          <Link href="/add" scroll={false} prefetch={false}>
            <Button icon="Add" variant="special" text="Add new" />
          </Link>
        </div>
      </div>
      <div className="grow flex flex-row justify-start items-center p-6 border-y-[1px] border-grey-60">
        <Button icon="Light mode" variant="secondary" />
      </div>
      {/* third row */}
      <div />
      <div className="border-x-[1px] border-grey-60 min-w-[768px]">
        {children}
      </div>
      <div />
    </div>
  );
}
