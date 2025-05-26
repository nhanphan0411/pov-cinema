type Props = {
    choices: { label: string; next: string }[];
    onSelect: (next: string) => void;
  };
  
  export const ChoiceOverlay: React.FC<Props> = ({ choices, onSelect }) => (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-transparent space-y-4">
      {choices.map((choice, idx) => (
        <button
          key={idx}
          className="bg-white text-black px-6 py-3 rounded-full text-lg hover:bg-gray-300 transition"
          onClick={() => onSelect(choice.next)}
        >
          {choice.label}
        </button>
      ))}
    </div>
  );