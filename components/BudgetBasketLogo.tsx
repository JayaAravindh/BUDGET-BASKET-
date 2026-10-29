import Image from "next/image";
import Link from "next/link";

type BudgetBasketLogoProps = {
  width?: number;
  height?: number;
  className?: string;
  href?: string;
};

export default function BudgetBasketLogo({
  width = 180,
  height = 80,
  className = "",
  href = "/",
}: BudgetBasketLogoProps) {
  const logo = (
    <Image
      src="/images/budget-basket-logo.png"
      alt="Budget Basket"
      width={width}
      height={height}
      priority
      className={`h-auto max-w-full object-contain ${className}`}
    />
  );

  return (
    <Link href={href} aria-label="Budget Basket home" className="inline-flex">
      {logo}
    </Link>
  );
}
