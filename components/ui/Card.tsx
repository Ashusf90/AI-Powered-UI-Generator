type CardProps = {
  title?: string;
  children: React.ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <div className="ui-card">
      {title && <div className="ui-card-title">{title}</div>}
      {children}
    </div>
  );
}
