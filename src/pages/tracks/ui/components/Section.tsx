import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
}

export const Section: React.FC<Props> = ({ title, children }) => {
  return (
    <section>
      <h2 className="text-3xl font-medium mb-4">{title}</h2>
      {children}
    </section>
  );
};
