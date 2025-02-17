import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input = ({
    id,
    label,
    type = 'text',
    required,
    register,
    errors,
}: InputProps) => {
    const hasError = errors[id];
    
    return (
        <div className="w-full">
            <input
                type={type}
                id={id}
                {...register(id, { required })}
                placeholder={label}
                className={`
                    w-full
                    p-2.5
                    text-sm
                    bg-white
                    border
                    rounded-md
                    outline-none
                    ${hasError ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black'}
                `}
            />
        </div>
    );
};

export default Input;
