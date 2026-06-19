import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, CalendarDays, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
const passengerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
});
const formSchema = z.object({
  passengers: z.array(passengerSchema),
});
type FormData = z.infer<typeof formSchema>;
interface PassengerFormProps {
  passengerCount: number;
  onSubmit: (data: FormData) => void;
  onBack: () => void;
  isSubmitting: boolean;
}
export function PassengerForm({ passengerCount, onSubmit, onBack, isSubmitting }: PassengerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passengers: Array.from({ length: passengerCount }, () => ({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
      })),
    },
  });
  const { fields } = useFieldArray({
    control,
    name: 'passengers',
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6" noValidate>
      {fields.map((field, index) => (
        <fieldset key={field.id} className="space-y-4">
          <legend className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">
              {index + 1}
            </span>
            Passenger {index + 1}
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label
                htmlFor={`passengers.${index}.firstName`}
                className="block text-xs font-medium text-gray-600 mb-1.5"
              >
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                <input
                  id={`passengers.${index}.firstName`}
                  {...register(`passengers.${index}.firstName`)}
                  className={cn(
                    'w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all',
                    errors.passengers?.[index]?.firstName
                      ? 'border-red-300 bg-red-50/50'
                      : 'border-gray-200'
                  )}
                  placeholder="John"
                />
              </div>
              {errors.passengers?.[index]?.firstName && (
                <p className="text-xs text-red-500 mt-1" role="alert">
                  {errors.passengers[index].firstName.message}
                </p>
              )}
            </div>
            {/* Last Name */}
            <div>
              <label
                htmlFor={`passengers.${index}.lastName`}
                className="block text-xs font-medium text-gray-600 mb-1.5"
              >
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                <input
                  id={`passengers.${index}.lastName`}
                  {...register(`passengers.${index}.lastName`)}
                  className={cn(
                    'w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all',
                    errors.passengers?.[index]?.lastName
                      ? 'border-red-300 bg-red-50/50'
                      : 'border-gray-200'
                  )}
                  placeholder="Doe"
                />
              </div>
              {errors.passengers?.[index]?.lastName && (
                <p className="text-xs text-red-500 mt-1" role="alert">
                  {errors.passengers[index].lastName.message}
                </p>
              )}
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor={`passengers.${index}.email`}
                className="block text-xs font-medium text-gray-600 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                <input
                  id={`passengers.${index}.email`}
                  type="email"
                  {...register(`passengers.${index}.email`)}
                  className={cn(
                    'w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all',
                    errors.passengers?.[index]?.email
                      ? 'border-red-300 bg-red-50/50'
                      : 'border-gray-200'
                  )}
                  placeholder="john@example.com"
                />
              </div>
              {errors.passengers?.[index]?.email && (
                <p className="text-xs text-red-500 mt-1" role="alert">
                  {errors.passengers[index].email.message}
                </p>
              )}
            </div>
            {/* Phone */}
            <div>
              <label
                htmlFor={`passengers.${index}.phone`}
                className="block text-xs font-medium text-gray-600 mb-1.5"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                <input
                  id={`passengers.${index}.phone`}
                  type="tel"
                  {...register(`passengers.${index}.phone`)}
                  className={cn(
                    'w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all',
                    errors.passengers?.[index]?.phone
                      ? 'border-red-300 bg-red-50/50'
                      : 'border-gray-200'
                  )}
                  placeholder="+880 1XXX XXXXXX"
                />
              </div>
              {errors.passengers?.[index]?.phone && (
                <p className="text-xs text-red-500 mt-1" role="alert">
                  {errors.passengers[index].phone.message}
                </p>
              )}
            </div>
            {/* Date of Birth */}
            <div className="sm:col-span-2">
              <label
                htmlFor={`passengers.${index}.dateOfBirth`}
                className="block text-xs font-medium text-gray-600 mb-1.5"
              >
                Date of Birth
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                <input
                  id={`passengers.${index}.dateOfBirth`}
                  type="date"
                  {...register(`passengers.${index}.dateOfBirth`)}
                  className={cn(
                    'w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all sm:max-w-xs',
                    errors.passengers?.[index]?.dateOfBirth
                      ? 'border-red-300 bg-red-50/50'
                      : 'border-gray-200'
                  )}
                />
              </div>
              {errors.passengers?.[index]?.dateOfBirth && (
                <p className="text-xs text-red-500 mt-1" role="alert">
                  {errors.passengers[index].dateOfBirth.message}
                </p>
              )}
            </div>
          </div>
          {index < fields.length - 1 && <hr className="border-gray-100" />}
        </fieldset>
      ))}
      {/* Form actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>
        <Button type="submit" className="flex-1" isLoading={isSubmitting}>
          {isSubmitting ? 'Processing Booking...' : 'Confirm Booking'}
        </Button>
      </div>
    </form>
  );
}