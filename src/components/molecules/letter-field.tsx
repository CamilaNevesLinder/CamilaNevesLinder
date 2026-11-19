import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { Textarea } from '@/components/atoms/textarea';
import { cn } from '@/lib/utils';

const FIELD_CLASSNAME =
  'border-line-strong text-espresso placeholder:text-taupe/80 focus-visible:border-clay aria-invalid:border-destructive min-h-12 rounded-none border-0 border-b-[1.5px] bg-transparent px-0.5 py-3 text-[17px] shadow-none transition-[border-color] duration-200 focus-visible:ring-0 aria-invalid:ring-0 md:text-[17px] dark:bg-transparent';

export function LetterField({
  name,
  label,
  placeholder,
  type = 'text',
  autoComplete,
  isMultiline = false,
  defaultValue,
  error,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  isMultiline?: boolean;
  defaultValue?: string;
  error?: string;
}) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const fieldProps = {
    id,
    name,
    placeholder,
    defaultValue,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
  };

  return (
    <div className="flex min-w-0 flex-[1_1_200px] flex-col">
      <Label
        htmlFor={id}
        className="text-taupe font-mono text-xs uppercase tracking-[0.08em]"
      >
        {label}
      </Label>
      {isMultiline ? (
        <Textarea
          {...fieldProps}
          rows={5}
          className={cn(FIELD_CLASSNAME, 'resize-y pt-0 leading-10')}
        />
      ) : (
        <Input
          {...fieldProps}
          type={type}
          autoComplete={autoComplete}
          className={FIELD_CLASSNAME}
        />
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-destructive mt-1.5 text-[15px]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
