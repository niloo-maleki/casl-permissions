interface ButtonProps {
  text: string;
  onClick: () => void;
}
const Button = (props: ButtonProps) => {
  const { text, onClick } = props;
  return (
    <button className="flex justify-center items-center w-fit bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 focus:outline-none transition duration-300"
    onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
