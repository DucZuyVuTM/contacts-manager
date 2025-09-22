import Swal from 'sweetalert2';
import { PASSWORD } from '../env';

export const promptPassword = async (
  title: string,
  text: string
): Promise<string | undefined> => {
  const { value: password } = await Swal.fire({
    title,
    text,
    input: 'password',
    inputPlaceholder: 'Enter password',
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off',
    },
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#2563eb',
    cancelButtonColor: '#dc2626',
    inputValidator: (value: string) => {
      if (!value.trim()) {
        return 'Password cannot be blank!';
      }
      if (value !== PASSWORD) {
        return 'Incorrect password!';
      }
      return null;
    },
  });

  return password;
};