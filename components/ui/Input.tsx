type InputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({ placeholder, value, onChange }: InputProps) {
  return (
    <input
      className="ui-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
