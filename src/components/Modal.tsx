"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Modal(props: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const router = useRouter();

  return (
    <div
      ref={overlay}
      onClick={(e) => e.target === overlay.current && router.back()}
      className="fixed inset-0 bg-black-100/60 z-50 "
      id="show-modal"
    >
      <div className="bg-grey-100 absolute left-1/2 top-1/2  min-w-[404px] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-sm">
        {props.children}
      </div>
    </div>
  );
}
